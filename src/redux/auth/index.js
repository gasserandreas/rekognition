import { combineReducers } from 'redux';

import { setToken } from '../../util/sessionUtil';
import hocReducer, { hocAsyncAction, hocCreateTypes  } from '../HOC';

// action def
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';
export const AUTH_LOG_IN = 'AUTH_LOG_IN';

const AUTH_LOGIN_REQUEST = hocCreateTypes('AUTH_LOGIN_REQUEST');

// simple actions
const authLogOut = message => ({
  type: AUTH_LOG_OUT,
  payload: message,
});

// complex actions
export const logOutUser = (message, broadcast = true) => (dispatch) => {
  // invalidate token
  setToken(null);

  // fire logout action
  dispatch(authLogOut(message));

  // clean up state

  try {
    if (broadcast) {
      window.localStorage.logout = true;
    }

    console.log('clear local & session storage');
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
  catch (error) {
    console.log('could not clear local and session storage');
  }

  // force reload to clear cache
  // window.location = '/';
};

export const loginUser = hocAsyncAction(
  AUTH_LOGIN_REQUEST,
  (obj) => (dispatch, getState, { GraphApi }) => {
    const query = `
      {
        
      }
    `;
    return GraphApi.query(query, { auth: false })
      .then(data => {
        
        console.log(data);
        return data;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
);

// reducers
const userId = (state = null, action) => {
  switch (action.type) {
    case AUTH_LOG_OUT:
      return null;
    case AUTH_LOG_IN:
      return action.payload.userId;
    default:
      return state;
  }
}

const meta = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOG_OUT:
      return {};
    case AUTH_LOG_IN:
      return {
        ...state,
        loggedIn: true,
        loggedInSince: Date.now,
      };
    default:
      return state;
  }
}

const loginRequest = hocReducer({
  ACTION_TYPE: AUTH_LOGIN_REQUEST,
  noData: true,
});

export default combineReducers({
  userId,
  meta,
  loginRequest,
});
