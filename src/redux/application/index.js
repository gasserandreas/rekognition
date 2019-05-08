import { combineReducers } from 'redux';

import messageReducer from './message';

import { refreshToken } from '../auth'; // eslint-disable-line import/no-cycle
import { tokenSelector, authUserIdSelector, isAuthenticatedSelector } from '../auth/selectors';

import { listImages } from '../images';

import { getToken, getUserId } from '../../util/sessionUtil';

export const AppStatus = {
  INITIAL: 'INITIAL',
  APPLICATION_WILL_LOAD: 'APPLICATION_WILL_LOAD',
  APPLICATION_DID_LOAD: 'APPLICATION_DID_LOAD',
};

// action types
export const APP_IDLE = 'APP_IDLE';
export const APP_RESET = 'APP_RESET';

const APPLICATION_STATUS_SET = 'APPLICATION_STATUS_SET';

// simple actions
export const appIdle = () => ({
  type: APP_IDLE,
});

export const appReset = () => ({
  type: APP_RESET,
});

const applicationWillLoad = () => ({
  type: APPLICATION_STATUS_SET,
  payload: AppStatus.APPLICATION_WILL_LOAD,
});

const applicationDidLoad = () => ({
  type: APPLICATION_STATUS_SET,
  payload: AppStatus.APPLICATION_DID_LOAD,
});

export const loadApplicationAuthenticated = () => (dispatch) => {
  // do more stuff in here
  dispatch(listImages());

  dispatch(applicationDidLoad());
};

// complex actions
export const loadApplication = () => async (dispatch, getState) => {
  dispatch(applicationWillLoad());

  /**
   *
   * 1. check for session token
   * 2. check for state token
   * 3. if session token
   */
  const state = getState();
  let token = getToken();
  let userId = getUserId();

  if (!token) {
    // try fetch local token
    token = tokenSelector(state);
  }

  if (!userId) {
    userId = authUserIdSelector(state);
  }

  if (token && userId) {
    // re-validate local token
    dispatch(refreshToken(token, userId));
  }

  if (isAuthenticatedSelector(state)) {
    // proceed with logged in init
    dispatch(loadApplicationAuthenticated());
  } else {
    // finalized app init
    dispatch(applicationDidLoad());
  }
};

// reducers
const status = (state = AppStatus.INITIAL, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_SET:
      return action.payload;
    default:
      return state;
  }
};

export const __testables__ = {
  applicationWillLoad,
  applicationDidLoad,
  APPLICATION_STATUS_SET,
};

export default combineReducers({
  status,
  message: messageReducer,
});
