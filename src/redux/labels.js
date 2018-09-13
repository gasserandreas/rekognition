import { combineReducers } from 'redux';

import { IMAGES_FETCH_SUCCESS } from './images';

// type definition
const LABELS_ADD = 'LABELS_ADD';

// simple actions
const labelsAdd = (imageId, labels) => {
  return {
    type: LABELS_ADD,
    imageId,
    labels,
  };
};

// reducers
const byImageId = (state  = {}, action) => {
  switch (action.type) {
    case LABELS_ADD:
      return {
        ...state,
        [action.imageId]: action.labels,
      };
    case IMAGES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.labelsByImageId,
      }
    default:
      return state;
  }
}

export {
  labelsAdd,
};

export default combineReducers({
  byImageId,
});
