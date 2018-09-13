import { createSelector } from 'reselect';

import { AppStatus, APP_WILL_LOGOUT } from '../app';

const selectState = state => state.app;

// status
export const selectStatusState = createSelector(
  selectState,
  state => state.status,
);

export const selectAppIsLoading = createSelector(
  selectStatusState,
  status => status === AppStatus.APP_WILL_LOAD,
);

export const selectAppDidLoad = createSelector(
  selectStatusState,
  status => status === AppStatus.APP_DID_LOAD,
);

// user status
export const selectUserStatus = createSelector(
  selectState,
  state => state.userStatus,
);

export const selectAppWillLogout = createSelector(
  selectUserStatus,
  userStatus => userStatus === APP_WILL_LOGOUT,
);

// meta
export const selectAppMeta = createSelector(
  selectState,
  app => app.meta,
);

// user
export const selectUser = createSelector(
  selectState,
  state => {
    const { user } = state;

    if (!user.id) {
      return null;
    }

    return user;
  },
);

export const selectIsAuthenticated = createSelector(
  selectUser,
  (user) => user && user.firstname && user.lastname && user.id,
);
