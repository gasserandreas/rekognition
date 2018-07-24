import { combineReducers } from 'redux';
import uuid from 'uuid';

const AUTH_SET = 'AUTH_SET';
const AUTH_UNSET = 'AUTH_UNSET';

// simple actions
const authSet = (credentials) => ({
  type: AUTH_SET,
  credentials,
});

const authUnset = () => ({
  type: AUTH_UNSET,
});

// complex actions
const setAuth = ({ firstname, lastname }) => (dispatch) => {
  const credentials = {
    firstname,
    lastname,
    shortName: `${firstname.x.charAt(0)}${firstname.x.charAt(0)}`,
    key: uuid.v4(),
  };

  dispatch(authSet(credentials));
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

const accessKey = (state = '', action) => {
  switch (action.type) {
    case AUTH_SET:
      return state.credentials.key;
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
        shortName: action.credentials.shortName,
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
});
