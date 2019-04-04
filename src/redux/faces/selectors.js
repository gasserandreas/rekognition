import { createSelector } from 'reselect';

export const facesStateSelector = state => state.faces;

export const facesIdsByImageIdSelector = createSelector(
  facesStateSelector,
  ({ idsByImageId }) => idsByImageId,
);

export const facesByIdSelector = createSelector(
  facesStateSelector,
  ({ byId }) => byId,
);

// dynamic selectors
export const facesByImageId = (state, imageId) => {
  if (!imageId) {
    return [];
  }

  const idsByImageId = facesIdsByImageIdSelector(state);
  const byId = facesByIdSelector(state);

  const ids = idsByImageId[imageId] || [];

  return ids.map(id => byId[id])
    .filter(face => face !== undefined);
}