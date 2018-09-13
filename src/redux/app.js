import { combineReducers } from 'redux';
import uuid from 'uuid';

import { persistor } from '../index';

import {
  selectUser,
  selectIsAuthenticated,
} from './selectors/app';

import { setUserId } from '../common/sessionUtils';
import { setAWSConfig } from '../common/services/aws';

import { fetchImages } from './images';

// helpers
const createShortName = (firstname, lastname) =>
  [firstname.substring(0, 1), lastname.substring(0, 1)]
  .join('')
  .toUpperCase();

const createFullName = (firstname, lastname) => `${firstname} ${lastname}`;

const createUser = (id, firstname, lastname) => ({
  id,
  firstname,
  lastname,
  fullName: createFullName(firstname, lastname),
  shortName: createShortName(firstname, lastname),
})

// action types
const APP_WILL_LOAD = 'APP_WILL_LOAD';
const APP_DID_LOAD = 'APP_DID_LOAD';

const AppStatus = {
  APP_WILL_LOAD,
  APP_DID_LOAD,
};

const APP_WILL_LOGOUT = 'APP_WILL_LOGOUT';

const APP_USER_SET = 'APP_USER_SET';

const APP_META_SET = 'APP_META_SET';

const APP_IDLE = 'APP_IDLE';

// simple actions
const appWillLoad = () => ({ type: APP_WILL_LOAD });
const appDidLoad = () => ({ type: APP_DID_LOAD });

const appWillLogout = () => ({ type: APP_WILL_LOGOUT });

const appUserSet = (user) => ({
  type: APP_USER_SET,
  user,
});

const appMetaSet = (key, value) => ({
  type: APP_META_SET,
  key,
  value,
});

// complex actions
const initApplication = () => (dispatch, getState) => {
  // dispatch(async (dispatch) => {
  // load current state
  const state = getState();

  dispatch(appWillLoad());

  const lastVisit = new Date().getTime();
  dispatch(appMetaSet('lastVisit', lastVisit));

  // set session storage key
  if (selectIsAuthenticated(state)) {
    const { id } = selectUser(state);
    setUserId(id);

    // fetch images
    fetchImages()(dispatch);
  }

  // init aws
  const awsConfig = {
    accessKeyId: process.env.REACT_APP_AWS_DEFAULT_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_DEFAULT_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
  };
  // init AWS
  setAWSConfig({ awsConfig, userId: process.env.REACT_APP_AWS_USER_ID });

  dispatch(appDidLoad());
  // })
};

const setMeta = (key, value) => (dispatch) => {
  dispatch(appMetaSet(key, value));
};

const register = ({ firstname, lastname }) => (dispatch) => {
  const id = uuid.v4();

  // debug only
  // const id = '12d4cddc-2011-4a86-be10-f7e3286676f7';

  const user = createUser(id, firstname, lastname);

  setupUser(user)(dispatch);
}

const login = ({ id, firstname, lastname }) => (dispatch) => {
  const user = createUser(id, firstname, lastname);
  setupUser(user)(dispatch);
}

// internal use only
const setupUser = user => (dispatch) => {
  setUserId(user.id);

  // save to redux
  dispatch(appUserSet(user));

  // fetch images
  fetchImages()(dispatch);
}

const logout = (broadcast = true) => (dispatch) => {
  dispatch(appWillLogout());

  try {
    // as an extra precaution, I like to listen to "storage"
    // events which can be used to communicate across tabs.
    // In this way, I can listen for this change and use it
    // to trigger `doLogout` in other open tabs.
    if (broadcast) {
      window.localStorage.logout = true;
    }
    window.sessionStorage.clear();

    dispatch({ type: 'RESET' });

    persistor.purge();

    // hard refresh to flush memory
    window.location.reload();
  } catch(e) { console.log(e)}
}

const updateUser = ({ firstname, lastname }) => (dispatch, getState) => {
  const user = {
    ...getState().app.user || {},
    firstname,
    lastname,
    shortName: createShortName(firstname, lastname),
    fullName: createFullName(firstname, lastname),
  };

  // save to redux
  dispatch(appUserSet(user));
}

// reducers
const status = (state = null, action) => {
  switch (action.type) {
    case APP_WILL_LOAD:
    case APP_DID_LOAD:
      return action.type;
    default:
      return state;
  }
}

const userStatus = (state = null, action) => {
  switch (action.type) {
    case APP_WILL_LOGOUT:
      return action.type;
    default:
      return state;
  }
}

const user = (state = {}, action) => {
  switch (action.type) {
    case APP_USER_SET:
      return action.user;
    default:
      return state;
  }
}

const meta = (state = {}, action) => {
  switch (action.type) {
    case APP_META_SET:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

export {
  // action types
  APP_IDLE,
  APP_WILL_LOGOUT,
  AppStatus,
  // simple actions
  appMetaSet,
  // complex actions
  initApplication,
  register,
  login,
  logout,
  updateUser,
  setMeta,
}

export default combineReducers({
  status,
  userStatus,
  user,
  meta,
})
