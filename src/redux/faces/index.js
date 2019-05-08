import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// action types
const FACES_ADD_FACES = 'FACES_ADD_FACES';

// simple actions
export const facesAddFaces = (imageId, faces) => {
  const ids = [];
  const byId = {};
  faces.forEach((face) => {
    const { id } = face;

    ids.push(id);
    byId[id] = face;
  });

  return {
    type: FACES_ADD_FACES,
    payload: {
      imageId,
      ids,
      byId,
    },
  };
};

// complex actions

// reducers
const byId = (state = {}, action) => {
  switch (action.type) {
    case FACES_ADD_FACES:
      return {
        ...state,
        ...action.payload.byId,
      };
    default:
      return state;
  }
};

const idsByImageId = (state = {}, action) => {
  switch (action.type) {
    case FACES_ADD_FACES:
      return {
        ...state,
        [action.payload.imageId]: action.payload.ids,
      };
    default:
      return state;
  }
};

// offline config
const persistConfig = {
  key: 'rekognition-faces',
  storage,
  whitelist: ['idsByImageId', 'byId'],
  stateReconciler: autoMergeLevel2,
};

export const __testables__ = {
  FACES_ADD_FACES,
};

export default persistReducer(
  persistConfig,
  combineReducers({
    byId,
    idsByImageId,
  }),
);
