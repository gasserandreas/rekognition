import { createSelector } from 'reselect';

const authStateSelector = state => state.auth || {};

export const authMetaSelector = createSelector(
  authStateSelector,
  ({ meta }) => meta || {},
);

export const isAuthenticatedSelector = createSelector(
  authMetaSelector,
  ({ loggedIn }) => loggedIn || false,
);

export const authUserIdSelector = createSelector(
  authStateSelector,
  ({ userId }) => userId || null,
);

export const tokenSelector = createSelector(
  authStateSelector,
  ({ token }) => token || null,
);

export const authRememberSelector = createSelector(
  authMetaSelector,
  ({ remember }) => remember || false,
);

export const authUsernameSelector = createSelector(
  authStateSelector,
  ({ username }) => username,
);

export const isValidEmailSelector = createSelector(
  authStateSelector,
  ({ validEmail }) => validEmail,
);

export const loginRequestSelector = createSelector(
  authStateSelector,
  ({ loginRequest }) => loginRequest,
);

export const signUpRequestSelector = createSelector(
  authStateSelector,
  ({ signupRequest }) => signupRequest,
);

export const checkEmailRequestSelector = createSelector(
  authStateSelector,
  ({ checkEmailRequest }) => checkEmailRequest,
);
