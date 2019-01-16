import { createSelector } from 'reselect';

const imagesStateSelector = state => state.images;

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

// list
export const imagesListRequestSelector = createSelector(
  imagesStateSelector,
  ({ listImageRequest }) => listImageRequest,
);

// add image 
export const addImageRequestSelector = createSelector(
  imagesStateSelector,
  ({ addImageRequest }) => addImageRequest,
);

export const addImageIsLoading = createSelector(
  addImageRequestSelector,
  ({ loading }) => loading,
);

// get image
export const getImageRequestSelector = createSelector(
  imagesStateSelector,
  ({ getImageRequest }) => getImageRequest,
);

export const getImageIsLoading = createSelector(
  getImageRequestSelector,
  ({ loading }) => loading,
);
