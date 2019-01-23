import { createSelector } from 'reselect';

const userStateSelector = state => state.user;

export const userSelector = createSelector(
  userStateSelector,
  ({ user }) => user,
);

export const getUserInfoRequestSelector = createSelector(
  userStateSelector,
  ({ userInfoRequest }) => userInfoRequest,
);

export const updateUserRequestSelector = createSelector(
  userStateSelector,
  ({ updateUserRequest }) => updateUserRequest,
);
