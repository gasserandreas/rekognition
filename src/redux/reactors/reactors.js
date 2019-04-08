import { createSelector } from 'reselect';

import { listImages } from '../images';

import { isAuthenticatedSelector } from '../auth/selectors';
import { imagesListRequestSelector } from '../images/selectors';

const appTimeSelector = state => state.appTime;

const refreshTime = 180000;
// const refreshTime = 30000;

const checkStaleImageData = createSelector(
  isAuthenticatedSelector,
  appTimeSelector,
  imagesListRequestSelector,
  (isAuthenticated, appTime, { lastFetch, loading }) => {
    if (!isAuthenticated) {
      return null;
    }

    if (loading) {
      return null;
    }

    if (!lastFetch) {
      return null;
    }

    if (appTime - lastFetch <= refreshTime) {
      return null;
    }

    return listImages();
  }
);

export const __testables__ = {
  checkStaleImageData,
  refreshTime,
  appTimeSelector,
};

export default [
  checkStaleImageData,
];
