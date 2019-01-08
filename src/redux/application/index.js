import { combineReducers } from 'redux';

import { sideBarVisibilitySelector } from './selectors';

import { refreshToken } from '../auth';
import {
  tokenSelector,
  authUserIdSelector,
  isAuthenticatedSelector,
} from '../auth/selectors';

import { listImages } from '../images';

import { getToken, getUserId } from '../../util/sessionUtil';

export const AppStatus = {
  INITIAL: 'INITIAL',
  APPLICATION_WILL_LOAD: 'APPLICATION_WILL_LOAD',
  APPLICATION_DID_LOAD: 'APPLICATION_DID_LOAD',
};

// action types
export const APP_IDLE = 'APP_IDLE';

const APPLICATION_SIDE_BAR_VISIBILITY_SET = 'APPLICATION_SIDE_BAR_VISIBILITY_SET';
const APPLICATION_STATUS_SET = 'APPLICATION_STATUS_SET';

// simple actions
const applicationSideBarVisibilitySet = (status) => ({
  type: APPLICATION_SIDE_BAR_VISIBILITY_SET,
  payload: status,
});

const applicationWillLoad = () => ({
  type: APPLICATION_STATUS_SET,
  payload: AppStatus.APPLICATION_WILL_LOAD,
});

const applicationDidLoad = () => ({
  type: APPLICATION_STATUS_SET,
  payload: AppStatus.APPLICATION_DID_LOAD,
});

// complex actions
export const showSideBar = () => (dispatch) => {
  dispatch(applicationSideBarVisibilitySet(true));
};

export const hideSideBar = () => (dispatch) => {
  dispatch(applicationSideBarVisibilitySet(false));
};

export const toggleSideBar = () => (dispatch, getState) => {
  const showSideBar = sideBarVisibilitySelector(getState());
  dispatch(applicationSideBarVisibilitySet(!showSideBar));
}

export const loadApplication = () => (async (dispatch, getState) => {
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
});

export const loadApplicationAuthenticated = () => (dispatch) => {
  // do more stuff in here

  console.log('auth init stuff');

  dispatch(listImages());

  dispatch(applicationDidLoad());
}

// reducers
const sideBarVisibility = (state = true, action) => {
  switch (action.type) {
    case APPLICATION_SIDE_BAR_VISIBILITY_SET:
      return action.payload;
    default:
      return state;
  }
};

const status = (state = AppStatus.INITIAL, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_SET:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  status,
  sideBarVisibility,
});
