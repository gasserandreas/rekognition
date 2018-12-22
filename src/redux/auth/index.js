import { combineReducers } from 'redux';
import gql from "graphql-tag";

import { setToken, setUserId } from '../../util/sessionUtil';
import hocReducer, { hocAsyncAction, hocCreateTypes  } from '../HOC';

import { selectAuthRemember } from './selectors';

import { loadApplicationAuthenticated } from '../application';

// action def
export const AUTH_LOG_IN = 'AUTH_LOG_IN';
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';

export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SET_USER_ID = 'AUTH_SET_USER_ID'

const AUTH_LOGIN_REQUEST = hocCreateTypes('AUTH_LOGIN_REQUEST');

// simple actions
const authLogin = (remember) => ({
  type: AUTH_LOG_IN,
  payload: {
    loggedIn: true,
    loggedInSince: Date.now(),
    remember,
  },
});

const authLogOut = message => ({
  type: AUTH_LOG_OUT,
  payload: message,
});

const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  payload: token,
});

const authSetUserId = userId => ({
  type: AUTH_SET_USER_ID,
  payload: userId,
});

// internal actions

// handle auth / login / refresh
const handleAuth = (token, userId, remember) => (dispatch) => {
  // save token
  setToken(token);
  setUserId(userId);

  // persist if needed
  if (remember) {
    dispatch(authSetToken(token));
    dispatch(authSetUserId(userId));
  }

  dispatch(authLogin(remember));
}

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
  if (process.env.NODE_ENV !== 'development') {
    window.location = '/';
  }
};

export const logInUser = hocAsyncAction(
  AUTH_LOGIN_REQUEST,
  (credentials) => (dispatch, __, { GraphApi }) => {
    const { email, password, remember } = credentials;

    const LOGIN_USER = gql`
      mutation loginUser($email: String!, $password: String!) {
        loginUser(input: {
          email: $email,
          password: $password
        }) {
          user {
            id
            lastname
            firstname
          }
          token
        }
      }
    `;
    const variables = {
      email,
      password,
    };
    return GraphApi.mutation(LOGIN_USER, variables)
      .then((data) => {
        const { loginUser: { token, user } } = data;
        const { id } = user;
        
        dispatch(handleAuth(token, id, remember));

        // logged in init
        dispatch(loadApplicationAuthenticated());

        return data;
      });
  }
);

export const refreshToken = (token, userId) => (dispatch, getState) => {
  const state = getState();
  const remember = selectAuthRemember(state);

  console.log('refresh');
  console.log(userId);

  dispatch(handleAuth(token, userId, remember));
}

// reducers
const userId = (state = null, action) => {
  switch (action.type) {
    case AUTH_LOG_OUT:
      return null;
    case AUTH_SET_USER_ID:
      return action.payload;
    default:
      return state;
  }
}

const token = (state = null, action) => {
  switch (action.type) {
    case AUTH_LOG_OUT:
      return null;
    case AUTH_SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

const meta = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOG_OUT:
      return {};
    case AUTH_LOG_IN:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        loggedInSince: action.payload.loggedInSince,
        remember: action.payload.remember,
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
  token,
  meta,
  loginRequest,
});
