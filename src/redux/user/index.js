import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import gql from "graphql-tag";

import hocReducer, { hocAsyncAction, hocCreateTypes } from '../HOC';

// action types
const USER_GET_USER_INFO_REQUEST = hocCreateTypes('USER_GET_USER_INFO_REQUEST');

// simple actions

// complex actions
export const getUserInfo = hocAsyncAction(
  USER_GET_USER_INFO_REQUEST,
  (userId) => (_, __, { GraphApi }) => {
    const GET_USER_INFO = gql`
      query getUserInfo($userId: ID!) {
        getUserInfo(user_id: $userId) {
          id
          email
          lastname
          firstname
        }
      }
    `;
    const variables = {
      userId,
    };

    return GraphApi.query(GET_USER_INFO, variables);
  }
);

// reducers

const userInfoRequest = hocReducer({
  ACTION_TYPE: USER_GET_USER_INFO_REQUEST,
  noData: false,
});

// define sub persist config
const persistConfig = {
  key: 'rekognition-user',
  storage,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(
  persistConfig,
  combineReducers({
    // hoc reducers
    userInfoRequest
  })
);