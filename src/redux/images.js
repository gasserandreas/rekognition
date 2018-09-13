import { combineReducers } from 'redux';
import uuid from 'uuid';

import { facesAdd } from './faces';
import { labelsAdd } from './labels';

import {
  uploadToS3,
  detectFaces,
  detectLabels,
} from '../common/services/aws';
import { uploadImage, getImages } from '../common/services/networkUtils';

import { selectAuthKey } from '../selectors/auth';

import * as RequestStatus from '../enums/RequestStatus';

// helper functions
const readAsDataURL = (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  });
};

// action types
const IMAGES_ADD_IMAGE = 'IMAGES_ADD_IMAGE';
const IMAGES_SELECT_IMAGE = 'IMAGES_SELECT_IMAGE';

const IMAGES_UPLOAD_REQUEST = 'IMAGES_UPLOAD_REQUEST';
const IMAGES_UPLOAD_SUCCESS = 'IMAGES_UPLOAD_SUCCESS';
const IMAGES_UPLOAD_FAILURE = 'IMAGES_UPLOAD_FAILURE';

const IMAGES_FETCH_REQUEST = 'IMAGES_FETCH_REQUEST';
const IMAGES_FETCH_SUCCESS = 'IMAGES_FETCH_SUCCESS';
const IMAGES_FETCH_FAILURE = 'IMAGES_FETCH_FAILURE';

// simple actions
const imageAddImage = (data) => ({
  type: IMAGES_ADD_IMAGE,
  ...data,
});

const imageSelectImage = imageId => ({
  type: IMAGES_SELECT_IMAGE,
  imageId,
});

const imageUploadRequest = () => ({
  type: IMAGES_UPLOAD_REQUEST,
});

const imageUploadSuccess = (imageId = '') => ({
  type: IMAGES_UPLOAD_SUCCESS,
})

const imageUploadFailure = (imageId, error) => ({
  type: IMAGES_UPLOAD_FAILURE,
});

const imagesFetchRequest = () => ({
  type: IMAGES_FETCH_REQUEST,
});

const imagesFetchSuccess = (images) => {

  const byId = {};
  const ids = [];

  const labelsByImageId = {};

  let facesById = {};
  let facesIds = [];
  const facesByImageId = {};

  images.forEach((image) => {
    const {
      imageId,
      value,
      created,
      faces,
      labels,
    } = image;

    const newImage = {
      id: imageId,
      name: value,
      lastModified: created,
    };

    // save labels
    labelsByImageId[imageId] = labels;

    // save faces
    facesById = {
      ...facesById,
      ...faces,
    };
    facesIds = [...new Set([...facesIds, ...Object.keys(faces)])];
    facesByImageId[imageId] = Object.keys(faces);

    // store image
    byId[imageId] = newImage;
    ids.push(imageId);
  });

  return {
    byId,
    ids,
    labelsByImageId,
    facesById,
    facesIds,
    facesByImageId,
    type: IMAGES_FETCH_SUCCESS,
  };
};

const imagesFetchFailure = () => ({
  type: IMAGES_FETCH_FAILURE,
});

// complex actions
const addImage = file => (dispatch) => {
  dispatch(async (dispatch, getState) => {
    dispatch(imageUploadRequest());

    // create base image information
    const imageId = uuid.v4();
    const bucketName = process.env.REACT_APP_S3_UPLOAD_BUCKET;
    const { auth: { accessKey } } = getState();

    const { 
      lastModified,
      type,
    } = file;

    // get file ending
    let filetype = undefined;
    switch (type) {
      case 'image/jpeg':
        filetype = '.jpeg';
        break;
      case 'image/png':
        filetype = '.png';
        break;
      default:
        filetype = undefined;
    }

    const rawImageString = await readAsDataURL(file)
    const imageString = rawImageString.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(imageString, 'base64');

    const newName = `${imageId}${filetype}`;
    const imageName = `${accessKey}/${newName}`;

    // image object
    const image = {
      id: imageId,
      lastModified,
      name: newName,
    };

    // start async job
    try {

      // upload to s3
      const s3Upload = await uploadToS3(bucketName, imageName, buffer)
        .then((obj) => {
          console.log(obj);
          return Promise.resolve(true)
        });


      // start rekognition
      const { rawFaces, rawLabels } = await Promise.all([
        detectFaces(bucketName, imageName),
        detectLabels(bucketName, imageName),
      ])
      .then((response) => ({
        rawFaces: response[0],
        rawLabels: response[1],
      }));
      
      // process faces
      const faceById = {};
      const faceIds = [];
      rawFaces.forEach((properties, i) => {
        const id = uuid.v4();
        const face = {
          id,
          name: `Face ${i + 1}`,
          properties,
        };
        faceById[id] = face;
        faceIds.push(id);
      });

      // add faces
      dispatch(facesAdd(imageId, faceById, faceIds));

      // process labels
      // const rawLabels = await detectLabels(bucketName, imageName);
      const labels = rawLabels.Labels.map((label) => {
        const { Name, Confidence } = label;
        return {
          key: Name,
          value: Confidence,
        };
      });
      dispatch(labelsAdd(imageId, labels));

      // create new images object
      const newImage = {
        ...image,
        labels,
        faces: faceById,
      };

      // add to dynamo
      const dbRequest = await uploadImage(accessKey, newImage);

      dispatch(imageSelectImage(imageId));
      dispatch(imageAddImage({ image, imageId }));

      // success
      dispatch(imageUploadSuccess(imageId));
    } catch(error) {
      console.log(error);
      dispatch(imageUploadFailure(imageId, error));
    }
  });
};

const fetchImages = () => (dispatch) => {
  dispatch(async (dispatch, getState) => {
    dispatch(imagesFetchRequest());
      try {

        const userId = selectAuthKey(getState());
        const images = await getImages(userId);

        dispatch(imagesFetchSuccess(images));
      } catch (e) {
        dispatch(imagesFetchFailure());
      }
  });
}

const selectImage = id => (dispatch) => {
  console.log(id);
  dispatch(imageSelectImage(id));
}

// reducers
const imageById = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return {
        ...state,
        [action.imageId]: action.image,
      };
    case IMAGES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.byId,
      };
    default:
      return state;
  }
};

const imageIds = (state = [], action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return [...new Set([...state, action.imageId])];
    case IMAGES_FETCH_SUCCESS:
      return [...new Set([...state, ...action.ids])];
    default:
      return state;
  }
};

const selectedImage = (state = '', action) => {
  switch (action.type) {
    case IMAGES_SELECT_IMAGE:
      return action.imageId;
    default:
      return state;
  }
};

const request = (state = RequestStatus.INITIAL, action) => {
  switch (action.type) {
    case IMAGES_UPLOAD_REQUEST:
      return RequestStatus.PENDING;
    case IMAGES_UPLOAD_SUCCESS:
      return RequestStatus.SUCCESS;
    case IMAGES_UPLOAD_FAILURE:
      return RequestStatus.FAILRUE;
    default:
      return state;
  }
};

export {
  addImage,
  fetchImages,
  selectImage,
  IMAGES_FETCH_SUCCESS,
};

export default combineReducers({
  byId: imageById,
  ids: imageIds,
  selectedImage,
  request,
});
