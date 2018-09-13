import { combineReducers } from 'redux';

// action types
const NETWORK_REQUEST_START = 'NETWORK_REQUEST_START';
const NETWORK_REQUEST_COMPLETE = 'NETWORK_REQUEST_COMPLETE';

// simple actions
const networkRequestStart = (id, actionType) => ({
  type: NETWORK_REQUEST_START,
  id,
  actionType,
});

const networkRequestComplete = (id) => ({
  type: NETWORK_REQUEST_COMPLETE,
  id,
});

// complex actions

// reducers

// requests
const requestById = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case NETWORK_REQUEST_START:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          type: action.actionType,
        },
      };
    case NETWORK_REQUEST_COMPLETE:
      delete newState[action.id];
      return {
        ...newState,
      };
    default:
      return state;
  }
};

const requestIds = (state = [], action) => {
  switch (action.type) {
    case NETWORK_REQUEST_START:
      return [...new Set([...state, action.id])];
    case NETWORK_REQUEST_COMPLETE:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
};

const requests = combineReducers({
  byId: requestById,
  ids: requestIds,
});

export {
  networkRequestStart,
  networkRequestComplete,
};

export default combineReducers({
  requests,
});