import { combineReducers } from 'redux';
import hocReducer, { hocAsyncAction, hocCreateTypes } from '../HOC';

// action types

const ADD_IMAGE_TYPES = hocCreateTypes('ADD_IMAGE_TYPES');

// simple actions

// complex actions
export const addImage = hocAsyncAction(
  ADD_IMAGE_TYPES,
  (file) => (_, __, { GraphApi }) => {
    console.log(file);

  }
);

// reducers
const addImageRequest = hocReducer({
  ACTION_TYPE: ADD_IMAGE_TYPES,
  noData: true,
});

const ids = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  // hoc reducers
  addImageRequest
});
