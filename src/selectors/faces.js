import { createSelector } from 'reselect';

import { selectSelectedImage } from './images';

export const selectFaceState = state => state.faces;

export const selectFacesById = createSelector(
  selectFaceState,
  faces => faces.byId,
);

export const selectSelectedFaceId = createSelector(
  selectFaceState,
  faces => faces.selectedFace,
);

export const selectSelectedFace = createSelector(
  selectFacesById,
  selectSelectedFaceId,
  (facesById, selectedFaceId) => {
    if (!selectedFaceId) {
      return null;
    }

    return facesById[selectedFaceId];
  }
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