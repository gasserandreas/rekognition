import { createSelector } from 'reselect';

import { createRequestStateSelector } from './hoc';

const selectImagesState = state => state.images;

export const selectImageById = createSelector(
  selectImagesState,
  ({ byId }) => byId
);

export const selectImageIds = createSelector(
  selectImagesState,
  ({ ids }) => ids
);

export const selectImages = createSelector(
  selectImageIds,
  selectImageById,
  (ids, byId) => {
    if (!ids || ids.length === 0) {
      return [];
    }

    return ids.map(id => byId[id]);
  }
);

export const selectFetchImagesRequest = createSelector(
  createRequestStateSelector('images'),
  request => request,
);

export const selectFetchImagesLoading = createSelector(
  createRequestStateSelector('images'),
  request => request.loading,
);

export const selectSelectedImageId = createSelector(
  selectImagesState,
  ({ selected }) => selected,
);

export const selectSelectedImage = createSelector(
  selectSelectedImageId,
  selectImageById,
  (id, imageById) => {
    if (!id) {
      return null;
    }

    const image = imageById[id];

    return image || null;
  }
);
