import { createSelector } from 'reselect';

import { selectSelectedImage } from './images';

export const selectFaceState = state => state.faces;

export const selectFacesById = createSelector(
  selectFaceState,
  faces => faces.byId,
);

export const selectImageFaces = createSelector(
  selectFaceState,
  selectSelectedImage,
  (faces, selectedImage) => {
    if (!selectedImage) {
      return [];
    }

    const { byImageId } = faces;
    const { id } = selectedImage;

    return byImageId[id] || [];
  }
);