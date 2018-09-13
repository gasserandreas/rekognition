import { createSelector } from 'reselect';

import { selectSelectedImageId } from './images';

const selectFacesState = state => state.faces;

export const selectFacesById = createSelector(
  selectFacesState,
  ({ byId }) => byId,
);

export const selectFaceIds = createSelector(
  selectFacesState,
  ({ ids }) => ids,
);

export const selectFacesByImageId = createSelector(
  selectFacesState,
  ({ byImageId }) => byImageId,
);

export const selectSelectedImageFaces = createSelector(
  selectSelectedImageId,
  selectFacesByImageId,
  selectFacesById,
  (imageId, facesByImageId, facesById) => {
    if (!imageId) {
      return [];
    }

    const faceIds = facesByImageId[imageId];

    if (!faceIds || faceIds.length === 0) {
      return [];
    }

    return faceIds
      .map(id => facesById[id])
      .sort((a, b) => a.name > b.name );
  },
);

export const selectSelectedFaceId = createSelector(
  selectFacesState,
  selectFacesById,
  ({ selected }, byId) => {
    if (!selected) {
      return null;
    }

    const face = byId[selected];

    return face.id || null;
  },
);
