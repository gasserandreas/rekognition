import { combineReducers } from 'redux';
import gql from "graphql-tag";

import { setToken } from '../../util/sessionUtil';
import hocReducer, { hocAsyncAction, hocCreateTypes  } from '../HOC';

// action def
export const AUTH_LOG_IN = 'AUTH_LOG_IN';
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT';

const AUTH_LOGIN_REQUEST = hocCreateTypes('AUTH_LOGIN_REQUEST');

// simple actions
const authLogin = (userId) => ({
  type: AUTH_LOG_IN,
  payload: {
    userId,
    loggedIn: true,
    loggedInSince: Date.now(),
  },
});

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
  if (process.env.NODE_ENV !== 'development') {
    window.location = '/';
  }
};

export const logInUser = hocAsyncAction(
  AUTH_LOGIN_REQUEST,
  (credentials) => (dispatch, __, { GraphApi }) => {
    const { email, password } = credentials;

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
        
        // save token
        setToken(token);

        dispatch(authLogin(id));
        
        return data;
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
        loggedIn: action.payload.loggedIn,
        loggedInSince: action.payload.loggedInSince,
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
