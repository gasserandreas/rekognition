import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import uuid from 'uuid';
import gql from "graphql-tag";

import hocReducer, { hocAsyncAction, hocCreateTypes } from '../HOC';

import { authUserIdSelector } from '../auth/selectors';
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
    const userId = authUserIdSelector(getState());
    const bucketName = process.env.REACT_APP_S3_UPLOAD_BUCKET;

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
    const s3ImagePath = `${userId}/${imageName}`;

    // handle upload and db put
    return readAsDataURL(file)
      .then((rawImageString) => {
        // handle file
        const imageString = rawImageString.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(imageString, 'base64');

        // upload to S3
        return AwsApi.uploadImageToS3(bucketName, s3ImagePath, type, imageBuffer);
      })
      // add to db
      .then((data) => {
        // graphql request
        const ADD_IMAGE = gql`
          mutation addImage($id: String!, $name: String!, $type: String!) {
            addImage(input: {
              id: $id
              name: $name
              type: $type
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
          id: imageId,
          name: imageName,
          type: filetype,
        };

        return GraphApi.mutation(ADD_IMAGE, variables)
          .then((data) => {
            const { addImage: { image } } = data;

            dispatch(imagesAddImage(image))

            return data;
          })
          // delete uploaded image if db insert fails
          .catch((error) => {
            // delete object from s3
            // always return GraphQL error to proper handle upload error
            return AwsApi.deleteS3Object(bucketName, s3ImagePath)
              .catch((deleteError) => {
                console.log('Could not delete object');
                console.log(deleteError);
                return Promise.reject(error);
              })
              .then(() => {
                return Promise.reject(error);
              });
          });
      })
      .then((graphData) => {
        const { addImage: { image } } = graphData;
        
        dispatch(imagesAddImage(image));

        if (shouldAnalyse) {
          console.log('start rekognition');
        }

        return graphData;
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
