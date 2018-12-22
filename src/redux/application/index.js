import { combineReducers } from 'redux';

import { refreshToken } from '../auth';
import {
  selectToken,
  selectAuthUserId,
  selectIsAuthenticated,
} from '../auth/selectors';

import { getToken, getUserId } from '../../util/sessionUtil';

export const AppStatus = {
  INITIAL: 'INITIAL',
  APPLICATION_WILL_LOAD: 'APPLICATION_WILL_LOAD',
  APPLICATION_DID_LOAD: 'APPLICATION_DID_LOAD',
};

// action types
export const APP_IDLE = 'APP_IDLE';

// const APPLICATION_USER_SET = 'APPLICATION_USER_SET';
const APPLICATION_STATUS_SET = 'APPLICATION_STATUS_SET';

// simple actions
const applicationWillLoad = () => ({
  type: APPLICATION_STATUS_SET,
  payload: AppStatus.APPLICATION_WILL_LOAD,
});

const applicationDidLoad = () => ({
  type: APPLICATION_STATUS_SET,
  payload: AppStatus.APPLICATION_DID_LOAD,
});

// complex actions
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

  console.log(token);
  console.log(userId);

  if (!token) {
    // try fetch local token
    token = selectToken(state);
  }

  if (!userId) {
    userId = selectAuthUserId(state);
  }

  if (token && userId) {
    // re-validate local token
    dispatch(refreshToken(token, userId));
  }

  if (selectIsAuthenticated(state)) {
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

  dispatch(applicationDidLoad());
}

// reducers
const status = (state = AppStatus.INITIAL, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_SET:
      return action.payload;
    default:
      return state;
  }
};

// const user = (state = null, action) => {
//   switch (action.type) {
//     case APPLICATION_USER_SET:
//       return action.payload;
//     default:
//       return state;
//   }
// };

export default combineReducers({
  status,
  // user,
});
