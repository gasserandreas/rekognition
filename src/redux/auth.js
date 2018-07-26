import { combineReducers } from 'redux';
import uuid from 'uuid';

const AUTH_SET = 'AUTH_SET';
const AUTH_UNSET = 'AUTH_UNSET';

// simple actions
const authSet = ({ credentials, meta }) => ({
  type: AUTH_SET,
  credentials,
  meta,
});

const authUnset = () => ({
  type: AUTH_UNSET,
});

// complex actions
const setAuth = ({ firstname, lastname }) => (dispatch) => {
  const credentials = {
    firstname,
    lastname,
    shortname: `${firstname.charAt(0)}${lastname.charAt(0)}`,
    key: uuid.v4(),
  };

  const meta = {
    loggedInSince: new Date().getTime(),
    loggedInVersion: process.env.REACT_APP_VERSION,
  }

  dispatch(authSet({ credentials, meta }));
};

const unsetAuth = () => (dispatch) => {
  dispatch(authUnset());
};

// reducers
const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case AUTH_SET:
      return true;
    case AUTH_UNSET:
      return false;
    default:
      return state;
  }
};

const initalMetaState = {
  loggedInSince: undefined,
  loggedInVersion: undefined,
}
const meta = (state = initalMetaState, action) => {
  switch (action.type) {
    case AUTH_SET:
      return action.meta;
    case AUTH_UNSET:
      return { ...initalMetaState };
    default:
      return state;
  }
};

const accessKey = (state = '', action) => {
  switch (action.type) {
    case AUTH_SET:
      return action.credentials.key;
    case AUTH_UNSET:
      return '';
    default:
      return state;
  }
};

const initialUserState = {
  firstname: undefined,
  lastname: undefined,
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case AUTH_SET:
      return {
        firstname: action.credentials.firstname,
        lastname: action.credentials.lastname,
        shortname: action.credentials.shortname,
      };
    case AUTH_UNSET:
      return initialUserState;
    default:
      return state;
  }
};

export {
  setAuth,
  unsetAuth,
};

export default combineReducers({
  isAuthenticated,
  accessKey,
  user,
  meta,
});
