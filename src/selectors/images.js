import { createSelector } from 'reselect';

const selectImageState = state => state.images;

export const selectImagesById = createSelector(
  selectImageState,
  images => images.byId,
);

export const selectImagesIds = createSelector(
  selectImageState,
  images => images.ids,
);

export const selectSelectedImage = createSelector(
  selectImageState,
  images => {
    const { selectedImage } = images;

    if (!selectedImage) {
      return null;
    }

    const image = images.byId[selectedImage];

    return image || null;
  }
);
