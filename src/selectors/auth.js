import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectAuthKey = createSelector(
  selectAuth,
  auth => auth.accessKey,
);
