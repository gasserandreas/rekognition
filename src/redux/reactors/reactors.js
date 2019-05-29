import { createSelector } from 'reselect';

import { listImages } from '../images';

import { isAuthenticatedSelector } from '../auth/selectors';
import { imagesListRequestSelector } from '../images/selectors';

const appTimeSelector = state => state.appTime;

const refreshTime = 180000;
// const refreshTime = 30000;

const isStateLoaded = key => state => state[key] !== undefined;

const checkStaleImageData = createSelector(
  isStateLoaded('images'),
  isAuthenticatedSelector,
  appTimeSelector,
  imagesListRequestSelector,
  (isLoaded, isAuthenticated, appTime, imagesListRequest) => {
    if (!isLoaded) {
      return null;
    }

    const { lastFetch, loading } = imagesListRequest;

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
  },
);

export const __testables__ = {
  checkStaleImageData,
  refreshTime,
  appTimeSelector,
};

export default [checkStaleImageData];
