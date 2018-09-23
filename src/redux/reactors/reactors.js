import { createSelector } from 'reselect';

import { appMetaSet } from '../app';
import { fetchImages } from '../images';

import { selectAppMeta, selectIsAuthenticated } from '../selectors/app';
import { selectFetchImagesRequest } from '../selectors/images';

const selectAppTimeState = state => state.appTime;

const firstVisitReactor = createSelector(
  selectAppMeta,
  (meta) => {
    const { firstVisit } = meta;
    if (!firstVisit) {
      return appMetaSet('firstVisit', Date.now());
    }
  }
);

const refreshTime = 180000;

const checkStaleImageData = createSelector(
  selectIsAuthenticated,
  selectAppTimeState,
  selectFetchImagesRequest,
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

    return fetchImages();
    // if (lastFetch && !loading && (appTime - lastFetch > refreshTime)) {
    //   return fetchImages();
    // }
  }
)

export default [
  firstVisitReactor,
  checkStaleImageData,
];