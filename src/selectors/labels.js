import { createSelector } from 'reselect';

import { selectSelectedImage } from './images';

const selectLabelsState = state => state.labels;

export const selectLabelsByImageId = createSelector(
  selectLabelsState,
  labels => labels.byImageId,
);

export const selectLabelsForSelectedImage = createSelector(
  selectLabelsByImageId,
  selectSelectedImage,
  (byImageId, selectedImage) => {
    if (!selectedImage) {
      return [];
    }

    return byImageId[selectedImage.id];
  }
);
