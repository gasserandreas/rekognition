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

export const selectToken = createSelector(
  selectAuthState,
  ({ token }) => token || null,
);

export const selectAuthMeta = createSelector(
  selectAuthState,
  ({ meta }) => meta,
);

export const selectAuthRemember = createSelector(
  selectAuthMeta,
  ({ remember }) => remember || false,
);

export const selectValidEmail = createSelector(
  selectAuthState,
  ({ validEmail }) => validEmail
);

export const selectLoginRequest = createSelector(
  selectAuthState,
  ({ loginRequest }) => loginRequest,
);

export const selectSignUpRequest = createSelector(
  selectAuthState,
  ({ signupRequest }) => signupRequest,
);

export const selectCheckEmailRequest = createSelector(
  selectAuthState,
  ({ checkEmailRequest }) => checkEmailRequest,
);
