import { combineReducers } from 'redux';
import uuid from 'uuid';

import { facesAdd } from './faces';
import { labelsAdd } from './labels';

import {
  uploadToS3,
  detectFaces,
  detectLabels,
} from '../common/services/aws';
import { uploadImage } from '../common/services/networkUtils';

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

// complex actions
const addImage = file => (dispatch, getState) => {
  dispatch(async (dispatch, getState) => {
    dispatch(imageUploadRequest());

    // create base image information
    const imageId = uuid.v4();
    const bucketName = process.env.REACT_APP_S3_UPLOAD_BUCKET;
    const { auth: { accessKey } } = getState();

    const { 
      lastModified,
      size,
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
      type,
      size,
    };

    // start async job
    try {

      // upload to s3
      const s3Upload = await uploadToS3(bucketName, imageName, buffer)
        .then((obj) => {
          console.log(obj);
          return Promise.resolve(true)
        });
      
      // analyse image
      const rawFaces = await detectFaces(bucketName, imageName);
      
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
      const rawLabels = await detectLabels(bucketName, imageName);
      dispatch(labelsAdd(imageId, rawLabels));

      // add to dynamo
      const dbRequest = await uploadImage(accessKey, image);

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

// reducers
const imageById = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return {
        ...state,
        [action.imageId]: action.image,
      };
    default:
      return state;
  }
};

const imageIds = (state = [], action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return [...new Set([...state, action.imageId])];
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
};

export default combineReducers({
  byId: imageById,
  ids: imageIds,
  selectedImage,
  request,
});
