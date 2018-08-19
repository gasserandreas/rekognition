import { combineReducers } from 'redux';

// action types
const FACES_ADD = 'FACES_ADD';

const FACES_SELECT = 'FACES_SELECT';

// simple actions
const facesAdd = (imageId, byId, ids) => ({
  type: FACES_ADD,
  byId,
  ids,
  imageId,
});

const facesSelect = faceId => ({
  type: FACES_SELECT,
  faceId,
});

// complex actions
const selectFace = faceId => (dispatch) => {
  dispatch(facesSelect(faceId));
};

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
};

const selectedFace = (state = null, action) => {
  switch (action.type) {
    case FACES_SELECT:
      return action.faceId;
    default:
      return state;
  }
};

export {
  facesAdd,
  selectFace,
};

export default combineReducers({
  byId,
  ids,
  byImageId,
  selectedFace,
});
