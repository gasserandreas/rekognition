import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
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

export const AUTH_SET_VALID_EMAIL = 'AUTH_SET_VALID_EMAIL';
export const AUTH_SET_INVALID_EMAIL = 'AUTH_SET_INVALID_EMAIL';

const AUTH_LOGIN_REQUEST = hocCreateTypes('AUTH_LOGIN_REQUEST');
const AUTH_SIGNUP_REQUEST = hocCreateTypes('AUTH_SIGNUP_REQUEST');
const AUTH_CHECK_EMAIL_REQUEST = hocCreateTypes('AUTH_CHECK_EMAIL_REQUEST');

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

const authSetValidEmail = () => ({
  type: AUTH_SET_VALID_EMAIL,
  payload: true,
});

const authSetInvalidEmail = () => ({
  type: AUTH_SET_INVALID_EMAIL,
  payload: false,
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
  (credentials) => (dispatch, _, { GraphApi }) => {
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
        console.log(data);
        const { loginUser: { token, user } } = data;
        const { id } = user;
        
        dispatch(handleAuth(token, id, remember));

        // logged in init
        dispatch(loadApplicationAuthenticated());

        return data;
      });
  }
);

export const signupUser = hocAsyncAction(
  AUTH_SIGNUP_REQUEST,
  (credentials) => (dispatch, _, { GraphApi }) => {
    const {
      email,
      password,
      remember,
      firstname,
      lastname
    } = credentials;

    const SIGNUP_USER = gql`
      mutation signupUser(
        $email: String!,
        $password: String!,
        $firstname: String!,
        $lastname: String!
      ) {
        signUpUser(input: {
          firstname: $firstname,
          lastname: $lastname,
          email: $email,
          password: $password,
        }) {
          user {
            id
            firstname
            lastname
          }
          token
        }
      }
    `;
    const variables = {
      email,
      password,
      firstname,
      lastname,
    };
    
    return GraphApi.mutation(SIGNUP_USER, variables)
      .then((data) => {
        const { signUpUser: { token, user } } = data;
        const { id } = user;

        
        dispatch(handleAuth(token, id, remember));

        // logged in init
        dispatch(loadApplicationAuthenticated());

        return data;
      });
  }
);

export const checkEmail = hocAsyncAction(
  AUTH_CHECK_EMAIL_REQUEST,
  (email) => (dispatch, _, { GraphApi }) => {
    const CHECK_EMAIL = gql`
      mutation emailInUse($email: String!) {
        emailInUse(input: {
          email: $email,
        })
      }
    `;

    const variables = {
      email,
    };

    return GraphApi.mutation(CHECK_EMAIL, variables)
      .then((data) => {
        const { emailInUse } = data;

        if (emailInUse) {
          dispatch(authSetInvalidEmail());
        } else {
          dispatch(authSetValidEmail());
        }
      });
  }
);

export const refreshToken = (token, userId) => (dispatch, getState, { GraphApi }) => {
  const state = getState();
  const remember = selectAuthRemember(state);

  const REFRESH_TOKEN = gql`
    mutation refreshToken($token: String!, $userId: String!) {
      refreshToken(input: {
        token: $token,
        userId: $userId,
      }) {
        user {
          id
          firstname
          lastname
        }
        token
      }
    }
  `;

  const variables = {
    token,
    userId,
  };

  return GraphApi.mutation(REFRESH_TOKEN, variables)
    .then((data) => {
      const { refreshToken: { token }} = data;
      dispatch(handleAuth(token, userId, remember));
    })
    .catch((error) => {
      dispatch(logOutUser('Could not refresh token', true));
    })
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

const validEmail = (state = null, action) => {
  switch (action.type) {
    case AUTH_SET_VALID_EMAIL:
      return true;
    case AUTH_SET_INVALID_EMAIL:
      return false;
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
  noData: false,
});

const signupRequest = hocReducer({
  ACTION_TYPE: AUTH_SIGNUP_REQUEST,
  noData: true,
});

const checkEmailRequest = hocReducer({
  ACTION_TYPE: AUTH_CHECK_EMAIL_REQUEST,
  noData: true,
});

// define sub persist config
const persistConfig = {
  key: 'rekognition-auth',
  storage,
  whitelist: ['userId', 'token', 'meta'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(
  persistConfig,
  combineReducers({
    userId,
    token,
    meta,
    validEmail,
    loginRequest,
    signupRequest,
    checkEmailRequest,
  }));
