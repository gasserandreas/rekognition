import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// action types
const LABELS_ADD_LABELS = 'LABELS_ADD_LABELS';

// simple actions
export const labelsAddLabels = (imageId, labels) => {
  
  const ids = [];
  const byId = {};
  labels.forEach((label) => {
    const { id } = label;

    ids.push(id);
    byId[id] = label;
  });

  return {
    type: LABELS_ADD_LABELS,
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
    case LABELS_ADD_LABELS:
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
    case LABELS_ADD_LABELS:
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
  key: 'rekognition-labels',
  storage,
  whitelist: ['idsByImageId', 'byId'],
  stateReconciler: autoMergeLevel2,
};

export const __testables__ = {
  LABELS_ADD_LABELS,
};

export default persistReducer(
  persistConfig,
  combineReducers({
    byId,
    idsByImageId,
  })
);
