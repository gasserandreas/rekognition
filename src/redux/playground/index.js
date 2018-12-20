import { combineReducers } from 'redux';
import gql from "graphql-tag";

import hocReducer, { hocCreateTypes ,hocAsyncAction } from '../HOC';
import { setToken } from '../../util/sessionUtil';

// action types
const PLAYGROUND_NOW_REQUEST = hocCreateTypes('PLAYGROUND_NOW_REQUEST');
const PLAYGROUND_LOGIN_REQUEST = hocCreateTypes('PLAYGROUND_LOGIN_REQUEST');
const PLAYGROUND_GET_USER_INFO_REQUEST = hocCreateTypes('PLAYGROUND_GET_USER_INFO_REQUEST');

// simple actions

// complex actions
export const requestNow = hocAsyncAction(
  PLAYGROUND_NOW_REQUEST,
  () => (_, __, { GraphApi }) => {
    const NOW = gql`
      {
        now
      }
    `;
    return GraphApi.query(NOW);
  }
);

export const loginUser = hocAsyncAction(
  PLAYGROUND_LOGIN_REQUEST,
  (credentials) => (_, __, { GraphApi }) => {
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
        const { loginUser: { token } } = data;
        
        // save token
        setToken(token);
        
        return data;
      });
  }
);

export const getUserInfo = hocAsyncAction(
  PLAYGROUND_GET_USER_INFO_REQUEST,
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
const now = hocReducer({
  ACTION_TYPE: PLAYGROUND_NOW_REQUEST,
  noData: false,
});

const login = hocReducer({
  ACTION_TYPE: PLAYGROUND_LOGIN_REQUEST,
  noData: false,
});

const userInfo = hocReducer({
  ACTION_TYPE: PLAYGROUND_GET_USER_INFO_REQUEST,
  noData: false,
});

export default combineReducers({
  now,
  login,
  userInfo
});
