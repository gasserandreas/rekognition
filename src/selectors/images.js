import { createSelector } from 'reselect';

import * as RequestStatus from '../enums/RequestStatus';

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

export const selectImageRequest = createSelector(
  selectImageState,
  images => images.request,
);

export const selectImageIsLoading = createSelector(
  selectImageRequest,
  request => request === RequestStatus.PENDING,
);
