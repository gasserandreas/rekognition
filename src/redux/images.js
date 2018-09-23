import uuid from 'uuid';
import { combineReducers } from 'redux';

// hoc redux
import hocReducer from './config/hocReducer';
import { hocAsyncAction } from './config/hocAction';
import { createHocTypes } from './config/hocUtils';

import { uploadToS3, detectFaces, detectLabels } from '../common/services/aws';
import { defaultConfig } from '../common/services/networkUtils';

import { facesAddFaces } from './faces';
import { networkRequestStart, networkRequestComplete } from './network';

import { selectUser } from './selectors/app';

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
const IMAGE_FETCH_TYPES = createHocTypes('IMAGE_FETCH_TYPES');
const IMAGE_POST_TYPES = createHocTypes('IMAGE_POST_TYPES');

const IMAGE_SELECT = 'IMAGE_SELECT';

// simples actions
const imageSelect = id => ({
  type: IMAGE_SELECT,
  id,
});

// complex actions
const selectImage = id => (dispatch) => {
  dispatch(imageSelect(id));
};

const fetchImages = hocAsyncAction(
  IMAGE_FETCH_TYPES,
  (item) => (dispatch, _, { api }) => {
    return api('image/')
      .then((images) => {
        // TODO: refactor later

        // images
        const byId = {};
        const ids = [];

        // faces
        const facesById = {};
        const facesByImageId = {};
        const faceIds = [];

        images.forEach((image) => {
          // get data
          const { imageId, faces } = image;

          // save
          byId[imageId] = image;
          ids.push(imageId);
          facesByImageId[imageId] = Object.keys(faces);

          // save faces
          Object.values(faces).forEach((face) => {
            const faceId = face.id;
            facesById[faceId] = face;
            faceIds.push(faceId);
          });
        })

        // extract labels and faces
        dispatch(facesAddFaces(facesById, faceIds, facesByImageId));

        return Promise.resolve({
          byId,
          ids,
        })
      });
    }
);

const postImage = hocAsyncAction(
  IMAGE_POST_TYPES,
  (imageId, file) => (dispatch, getState, { api }) => {
    dispatch(networkRequestStart());

    // create base image information
    // const imageId = uuid.v4();
    const bucketName = process.env.REACT_APP_S3_UPLOAD_BUCKET;
    const user = selectUser(getState());
    const userId = user.id;

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
 
     return readAsDataURL(file)
      .then((rawImageString) => {
        const imageString = rawImageString.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(imageString, 'base64');
    
        const newName = `${imageId}${filetype}`;
        const imageName = `${userId}/${newName}`;
    
        // image object
        const image = {
          id: imageId,
          lastModified,
          name: newName,
        };

        return uploadToS3(bucketName, imageName, buffer)
          .then(() => {
            return Promise.resolve({ bucketName, imageName, image });
          });
      })
      .then((options) => {
        const { bucketName, imageName, image } = options;
        return Promise.all([
          detectFaces(bucketName, imageName),
          detectLabels(bucketName, imageName),
        ])
        .then((response) => {
          return Promise.resolve({
            rawFaces: response[0],
            rawLabels: response[1],
            image,
          });
        })
      })
      .then(({ rawLabels, rawFaces, image }) => {

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

        // process labels
        const labels = rawLabels.Labels.map((label) => {
          const { Name, Confidence } = label;
          return {
            key: Name,
            value: Confidence,
          };
        });

        // create new images object
        const newImage = {
          ...image,
          labels,
          faces: faceById,
        };

        const options = {
          ...defaultConfig,
          method: 'POST',
          body: JSON.stringify({
            imageId: newImage.id,
            filename: newImage.name,
            faces: newImage.faces,
            labels: newImage.labels,
          }),
        };

        // save to dynamo db
        return api('image/', options)
          .then((image) => {
            return Promise.resolve({
              faceById,
              faceIds,
              labels,
              image,
            });
          });
      })
      .then(({ faceById, faceIds, image }) => {
        const byImageId = {
          [image.imageId]: faceIds,
        };
        dispatch(facesAddFaces(faceById, faceIds, byImageId));

        dispatch(networkRequestComplete());
        return Promise.resolve(image);
      })
      .catch((error) => {
        dispatch(networkRequestComplete());
        return Promise.reject(error);
      })
  },
  true
);

// reducers
const fetchRequest = hocReducer({
  ACTION_TYPE: IMAGE_FETCH_TYPES,
  noData: true,
});

const postRequest = hocReducer({
  ACTION_TYPE: IMAGE_POST_TYPES,
  noData: true,
});

const byId = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_FETCH_TYPES.SUCCESS:
      return {
        ...state,
        ...action.payload.byId,
      };
    case IMAGE_POST_TYPES.SUCCESS:
      return {
        ...state,
        [action.payload.imageId]: action.payload,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case IMAGE_FETCH_TYPES.SUCCESS:
      return [...new Set([...state, ...action.payload.ids])];
    case IMAGE_POST_TYPES.SUCCESS:
      return [...new Set([...state, action.payload.imageId])];
    default:
      return state;
  }
};

const selected = (state = null, action) => {
  switch (action.type) {
    case IMAGE_SELECT:
      return action.id;
    default:
      return state;
  }
};

export {
  selectImage,
  fetchImages,
  postImage,
};

export default combineReducers({
  byId,
  ids,
  selected,
  fetchRequest,
  postRequest,
});
