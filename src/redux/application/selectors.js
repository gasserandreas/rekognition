import { createSelector } from 'reselect';

import { AppStatus } from './index';

export const applicationStateSelector = state => state.application || {};

export const applicationStatusSelector = createSelector(
  applicationStateSelector,
  ({ status }) => status,
);

export const applicationDidLoadSelector = createSelector(
  applicationStatusSelector,
  (status) => {
    if (!status) {
      return false;
    }

    return status === AppStatus.APPLICATION_DID_LOAD;
  }
);
