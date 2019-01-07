import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import uuid from 'uuid';
import gql from "graphql-tag";

import hocReducer, { hocAsyncAction, hocCreateTypes } from '../HOC';

import { readAsDataURL } from './util';

// action types
const IMAGES_ADD_IMAGE = 'IMAGES_ADD_IMAGE';

const IMAGES_ADD_REQUEST_TYPES = hocCreateTypes('IMAGES_ADD_REQUEST_TYPES');

// simple actions
const imagesAddImage = image => ({
  type: IMAGES_ADD_IMAGE,
  payload: image,
});

// complex actions
export const addImage = hocAsyncAction(
  IMAGES_ADD_REQUEST_TYPES,
  (file, shouldAnalyse = true) => (dispatch, getState, { GraphApi, AwsApi }) => {
    // base attributes
    const imageId = uuid.v4();

    // get file ending
    let filetype = undefined;
    const { type } = file;
    switch (type) {
      case 'image/jpeg':
        filetype = 'jpeg';
        break;
      case 'image/png':
        filetype = 'png';
        break;
      default:
        filetype = undefined;
    }

    // create new image name
    const imageName = `${imageId}.${filetype}`;

    return readAsDataURL(file)
      .then((rawImageString) => {
        // prepare file upload
        const imageString = rawImageString.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(imageString, 'base64');

        const ADD_IMAGE = gql`
          mutation addImage($file: Upload!, $type: String!, $name: String!) {
            addImage(input: {
              file: $file,
              name: $name,
              type: $type,
            }) {
              image {
                id
                type
                name
                path
                created
              }
            }
          }
        `;

        const variables = {
          file: imageBuffer,
          name: imageName,
          type,
        };

        return GraphApi.mutation(ADD_IMAGE, variables)
          .then((data) => {
            const { addImage: { image } } = data;

            // save to redux
            dispatch(imagesAddImage(image))

            return data;
          });
      });
  }
);

// reducers
const addImageRequest = hocReducer({
  ACTION_TYPE: IMAGES_ADD_REQUEST_TYPES,
  noData: true,
});

const ids = (state = [], action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return [...new Set([...state, action.payload.id])];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_ADD_IMAGE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};

// define sub persist config
const persistConfig = {
  key: 'rekognition-auth',
  storage,
  whitelist: ['ids', 'byId'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(
  persistConfig,
  combineReducers({
    ids,
    byId,
    // hoc reducers
    addImageRequest
  })
);
