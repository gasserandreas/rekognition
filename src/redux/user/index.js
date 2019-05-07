import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import gql from 'graphql-tag';

import hocReducer, { hocAsyncAction, hocCreateTypes } from '../HOC';
import { authUserIdSelector } from '../auth/selectors';

// action types
const USER_UPDATE_USER_REQUEST = hocCreateTypes('USER_UPDATE_USER_REQUEST');
const USER_GET_USER_INFO_REQUEST = hocCreateTypes('USER_GET_USER_INFO_REQUEST');
const USER_SET_USER = 'USER_SET_USER';

// simple actions
const userSetUser = user => ({
  type: USER_SET_USER,
  payload: user,
});

// complex actions
export const updateUser = hocAsyncAction(USER_UPDATE_USER_REQUEST, user => (dispatch, __, { GraphApi }) => {
  const UPDATE_USER = gql`
    mutation updateUser($firstname: String!, $lastname: String!) {
      updateUser(input: { firstname: $firstname, lastname: $lastname }) {
        user {
          email
          firstname
          lastname
        }
      }
    }
  `;
  const variables = {
    firstname: user.firstname,
    lastname: user.lastname,
  };

  return GraphApi.mutation(UPDATE_USER, variables).then((data) => {
    dispatch(userSetUser(data.user));

    return data;
  });
});

export const getUserInfo = hocAsyncAction(USER_GET_USER_INFO_REQUEST, () => (dispatch, getState, { GraphApi }) => {
  const state = getState();
  const userId = authUserIdSelector(state);

  const GET_USER_INFO = gql`
    query getUserInfo($userId: ID!) {
      getUserInfo(user_id: $userId) {
        email
        lastname
        firstname
      }
    }
  `;
  const variables = {
    userId,
  };

  return GraphApi.query(GET_USER_INFO, variables).then((data) => {
    dispatch(userSetUser(data.getUserInfo));

    return data;
  });
});

// reducers
const userInitialState = {
  firstname: '',
  lastname: '',
  email: '',
};
const user = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_SET_USER:
      return action.payload;
    default:
      return state;
  }
};

const userInfoRequest = hocReducer({
  ACTION_TYPE: USER_GET_USER_INFO_REQUEST,
  noData: false,
});

const updateUserRequest = hocReducer({
  ACTION_TYPE: USER_UPDATE_USER_REQUEST,
  noData: false,
});

// define sub persist config
const persistConfig = {
  key: 'rekognition-user',
  storage,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
};

export const __testables__ = {
  USER_UPDATE_USER_REQUEST,
  USER_GET_USER_INFO_REQUEST,
  USER_SET_USER,
  userSetUser,
};

export default persistReducer(
  persistConfig,
  combineReducers({
    user,
    // hoc reducers
    userInfoRequest,
    updateUserRequest,
  }),
);
