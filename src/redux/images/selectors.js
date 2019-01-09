import { createSelector } from 'reselect';

const imagesStateSelector = state => state.images;

export const imagesListRequestSelector = createSelector(
  imagesStateSelector,
  ({ listImageRequest }) => listImageRequest,
);

export const imagesListSelector = createSelector(
  imagesStateSelector,
  ({ ids, byId }) => {
    if (ids.length === 0) {
      return [];
    }

    return ids.map(id => byId[id])
      .filter(item => item !== null);
  }
);

export const imagesByIdSelector = createSelector(
  imagesStateSelector,
  ({ byId }) => byId,
);
