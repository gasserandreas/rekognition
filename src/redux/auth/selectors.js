import { createSelector } from 'reselect';

const selectAuthState = state => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  ({ meta }) => {
    return meta.loggedIn || false;
  }
);

export const selectAuthUserId = createSelector(
  selectAuthState,
  ({ userId }) => userId || null,
);
