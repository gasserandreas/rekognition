import { combineReducers } from 'redux';

// action types
const FACES_ADD = 'FACES_ADD';

// simple actions
const facesAdd = (imageId, byId, ids) => ({
  type: FACES_ADD,
  byId,
  ids,
  imageId,
});

// reducers
const byId = (state = {}, action) => {
  switch (action.type) {
    case FACES_ADD:
      return {
        ...state,
        ...action.byId,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FACES_ADD:
      return [...new Set([...state, ...action.ids])];
    default:
      return state;
  }
};

const byImageId = (state = {}, action) => {
  switch (action.type) {
    case FACES_ADD:
      return {
        ...state,
        [action.imageId]: [
          ...new Set([...state[action.imageId] || [], ...action.ids])
        ],
      };
    default:
      return state;
  }
}

export {
  facesAdd,
};

export default combineReducers({
  byId,
  ids,
  byImageId,
});
