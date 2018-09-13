import { combineReducers } from 'redux';

// action types
const FACES_ADD_FACES = 'FACES_ADD_FACES';
const FACES_SELECT = 'FACES_SELECT';

// simple actions
const facesAddFaces = (byId, ids, byImageId) => ({
  type: FACES_ADD_FACES,
  byId,
  ids,
  byImageId,
});

const facesSelect = id => ({
  type: FACES_SELECT,
  id,
});

// complex actions
const selectFace = id => (dispatch) => {
  dispatch(facesSelect(id));
};

// reducers
const byId = (state = {}, action) => {
  switch (action.type) {
    case FACES_ADD_FACES:
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
    case FACES_ADD_FACES:
      return [...new Set([...state, ...action.ids])];
    default:
      return state;
  }
};

const byImageId = (state = {}, action) => {
  switch (action.type) {
    case FACES_ADD_FACES:
      return {
        ...state,
        ...action.byImageId,
      };
    default:
      return state;
  }
};

const selected = (state = null, action) => {
  switch (action.type) {
    case FACES_SELECT:
      return action.id;
    default:
      return state;
  }
};

export {
  facesAddFaces,
  selectFace,
};

export default combineReducers({
  byId,
  ids,
  byImageId,
  selected,
});
