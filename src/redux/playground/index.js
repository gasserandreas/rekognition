import { combineReducers } from 'redux';
import gql from "graphql-tag";

import hocReducer, { hocCreateTypes ,hocAsyncAction } from '../HOC';

// action types
const PLAYGROUND_NOW_REQUEST = hocCreateTypes('PLAYGROUND_NOW_REQUEST');
const PLAYGROUND_LOGIN_REQUEST = hocCreateTypes('PLAYGROUND_LOGIN_REQUEST');

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
    return GraphApi.mutation(LOGIN_USER, variables);
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

export default combineReducers({
  now,
  login,
});
