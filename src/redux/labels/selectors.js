import { createSelector } from 'reselect';

const labelsStateSelector = state => state.labels;

export const labelsIdsByImageIdSelector = createSelector(
  labelsStateSelector,
  ({ idsByImageId }) => idsByImageId,
);

export const labelsByIdSelector = createSelector(
  labelsStateSelector,
  ({ byId }) => byId,
);

// dynamic selectors
export const labelsByImageId = (state, imageId) => {
  if (!imageId) {
    return [];
  }

  const idsByImageId = labelsIdsByImageIdSelector(state);
  const byId = labelsByIdSelector(state);

  const ids = idsByImageId[imageId] || [];

  return ids.map(id => byId[id])
    .filter(label => label !== undefined);
}