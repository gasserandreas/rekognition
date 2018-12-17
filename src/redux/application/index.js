import { combineReducers } from 'redux';

export const AppStatus = {
  INITIAL: 'INITIAL',
  APPLICATION_WILL_LOAD: 'APPLICATION_WILL_LOAD',
  APPLICATION_DID_LOAD: 'APPLICATION_DID_LOAD',
};

// action types
export const APP_IDLE = 'APP_IDLE';

const APPLICATION_USER_SET = 'APPLICATION_USER_SET';
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

const applicationUserSetSuccess = user => ({
  type: APPLICATION_USER_SET,
  payload: user,
});

const applicationUserSetFailure = error => ({
  type: APPLICATION_USER_SET,
  payload: error,
  error: true,
});

// complex actions
export const loadApplication = () => (async (dispatch) => {
  dispatch(applicationWillLoad());

  dispatch(applicationDidLoad());
});

// reducers
const status = (state = AppStatus.INITIAL, action) => {
  switch (action.type) {
    case APPLICATION_STATUS_SET:
      return action.payload;
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case APPLICATION_USER_SET:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  status,
  user,
});
