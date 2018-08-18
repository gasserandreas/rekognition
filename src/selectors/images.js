import { createSelector } from 'reselect';

const selectImageState = state => state.images;

export const selectSelectedImage = createSelector(
  selectImageState,
  images => {
    console.log(images);
    const { selectedImage } = images;

    if (!selectedImage) {
      return null;
    }

    const image = images.byId[selectedImage];

    return image || null;
  }
);
