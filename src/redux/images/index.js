import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import uuid from 'uuid';
import gql from "graphql-tag";

import hocReducer, { hocAsyncAction, hocCreateTypes } from '../HOC';

import { readAsDataURL } from './util';

import { labelsAddLabels } from '../labels';
import { facesAddLabels } from '../faces';

// action types
const IMAGES_ADD_NEW_IMAGE = 'IMAGES_ADD_NEW_IMAGE';
const IMAGES_ADD_IMAGES = 'IMAGES_ADD_IMAGES';
const IMAGES_ADD_IMAGE = 'IMAGES_ADD_IMAGE';

const IMAGES_ADD_REQUEST_TYPES = hocCreateTypes('IMAGES_ADD_REQUEST_TYPES');
const IMAGES_LIST_REQUEST_TYPES = hocCreateTypes('IMAGES_LIST_REQUEST_TYPES');
const IMAGES_GET_REQUEST_TYPES = hocCreateTypes('IMAGES_GET_REQUEST_TYPES');

// simple actions
const imagesAddNewImage = image => ({
  type: IMAGES_ADD_NEW_IMAGE,
  payload: image,
});

const imagesAddImage = image => ({
  type: IMAGES_ADD_IMAGE,
  payload: image,
});

const imagesAddImages = (images) => {
  const ids = [];
  const byId = {};

  images.forEach((image) => {
    const { id } = image;
    ids.push(id);
    byId[id] = image;
  });

  return {
    type: IMAGES_ADD_IMAGES,
    payload: {
      byId,
      ids,
    },
  };
};

// complex actions
export const addImage = hocAsyncAction(
  IMAGES_ADD_REQUEST_TYPES,
  (file, shouldAnalyse = true) => (dispatch, getState, { GraphApi }) => {
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
          mutation addImage($file: Upload!, $type: String!, $name: String!, $analyse: Boolean) {
            addImage(input: {
              file: $file,
              name: $name,
              type: $type,
              analyse: $analyse
            }) {
              image {
                id
                type
                name
                path
                created
                labels {
                  id
                  name
                  confidence
                  parents
                  instances {
                    height
                    width
                    left
                    top
                  }
                }
                faces {
                  id
                  age {
                    low
                    high
                  }
                  position {
                    height
                    width
                    left
                    top
                  }
                  emotions {
                    name
                    confidence
                  }
                  attributes {
                    name
                    confidence
                    value
                  }
                }
              }
            }
          }
        `;

        const variables = {
          file: imageBuffer,
          name: imageName,
          type,
          analyse: shouldAnalyse,
        };

        return GraphApi.mutation(ADD_IMAGE, variables)
          .then((data) => {
            const { addImage: { image } } = data;

            const { faces, labels, ...imageData } = image;
            const { id } = image;

            // save to redux
            dispatch(imagesAddNewImage(imageData));
            dispatch(labelsAddLabels(id, labels));
            dispatch(facesAddLabels(id, faces));

            return data;
          });
      });
  }
);

export const listImages = hocAsyncAction(
  IMAGES_LIST_REQUEST_TYPES,
  () => (dispatch, _, { GraphApi }) => {
    const LIST_IMAGE = gql`
      query listImage($limit: Int, $nextToken: String) {
        listImage(limit: $limit, nextToken: $nextToken) {
          items {
            id
            created
            type
            name
            path
          }
        }
      }
    `;
    const variables = {
      limit: 0,
      nextToken: '',
    };

    return GraphApi.query(LIST_IMAGE, variables)
      .then((data) => {
        const { listImage: { items } } = data;
        
        dispatch(imagesAddImages(items));

        return data;
      })
  }
);

export const getImage = hocAsyncAction(
  IMAGES_GET_REQUEST_TYPES,
  (imageId) => (dispatch, _, { GraphApi }) => {

    const GET_IMAGE = gql`
      query getImage($imageId: ID!) {
        getImage(image_id: $imageId) {
          id
          type
          name
          path
          created
          labels {
            id
            name
            confidence
            parents
            instances {
              height
              width
              left
              top
            }
          }
          faces {
            id
            age {
              low
              high
            }
            position {
              height
              width
              left
              top
            }
            emotions {
              name
              confidence
            }
            attributes {
              name
              confidence
              value
            }
          }
        }
      }
    `;

    const variables = {
      imageId,
    };

    return GraphApi.query(GET_IMAGE, variables)
      .then((data) => {
        const { getImage } = data;

        const { faces, labels, ...image } = getImage;
        const { id } = image;
        
        dispatch(imagesAddImage(image));
        dispatch(labelsAddLabels(id, labels));
        dispatch(facesAddLabels(id, faces));

        return data;
      })
  }
);

// reducers
const addImageRequest = hocReducer({
  ACTION_TYPE: IMAGES_ADD_REQUEST_TYPES,
  noData: true,
});

const listImageRequest = hocReducer({
  ACTION_TYPE: IMAGES_LIST_REQUEST_TYPES,
  noData: true,
});

const getImageRequest = hocReducer({
  ACTION_TYPE: IMAGES_GET_REQUEST_TYPES,
  noData: true,
});

const ids = (state = [], action) => {
  switch (action.type) {
    case IMAGES_ADD_NEW_IMAGE:
    case IMAGES_ADD_IMAGE:
      return [...new Set([...state, action.payload.id])];
    case IMAGES_ADD_IMAGES:
      return [...new Set([...state, ...action.payload.ids])];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case IMAGES_ADD_NEW_IMAGE:
    case IMAGES_ADD_IMAGE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case IMAGES_ADD_IMAGES:
      return {
        ...state,
        ...action.payload.byId,
      };
    default:
      return state;
  }
};

// define sub persist config
const persistConfig = {
  key: 'rekognition-images',
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
    addImageRequest,
    listImageRequest,
    getImageRequest,
  })
);