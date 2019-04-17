/* global testUtils */
import * as selectors from '../selectors';

import listImagesJson from '../__data__/listImages.json';
import sortedListImages from '../__data__/sortedListImages.json';

const ids = [];
const byId = {};

// generate store
listImagesJson.data.listImage.items.forEach((image) => {
  const { id } = image;
  ids.push(id);
  byId[id] = image;
});

const initialState = {
  images: {
    ids,
    byId,
    addImageRequest: testUtils.createHocReducerState(),
    listImageRequest: testUtils.createHocReducerState(),
    getImageRequest: testUtils.createHocReducerState(),
  }
};

describe('images selector test suite', () => {
  it('should return empty object for null state', () => {
    expect(selectors.imagesStateSelector({}))
      .toEqual({});
  });

  it('should handle imagesStateSelector', () => {
    expect(selectors.imagesStateSelector(initialState))
      .toEqual(initialState.images);
  });

  describe('images selector: imagesListSelector test suite', () => {
    it('should handle default', () => {
      const list = Object.values(initialState.images.byId);
      expect(selectors.imagesListSelector(initialState))
        .toEqual(list);
    });

    it('should handle empty ids', () => {
      expect(selectors.imagesListSelector({
        images: {
          ...initialState.images,
          ids: [],
        },
      })).toEqual([]);
    });

    it('should handle non matching ids', () => {
      const list = Object.values(initialState.images.byId);
      expect(selectors.imagesListSelector({
        images: {
          ...initialState.images,
          ids: [
            ...initialState.images.ids,
            'invalid-id-1',
            'invalid-id-2',
          ],
        },
      })).toEqual(list);
    });
  });

  it('handle default', () => {
    expect(selectors.sortedImageListSelector(initialState))
      .toEqual(sortedListImages);
  });

  it('handle with empty dates', () => {
    const newInitialState = {
      images: {
        ids: [
          '2a2bdf23-e73f-4a2a-913e-da29926a195c',
          '39982447-a18e-4d88-9f16-53b9df1bfdb3',
          '7bf2bbd2-8749-4b37-a3d5-4498c7ea68bd',
        ],
        byId: {
          '2a2bdf23-e73f-4a2a-913e-da29926a195c': {
            id: '2a2bdf23-e73f-4a2a-913e-da29926a195c',
            created: '2019-02-09T08:12:11.736Z',
            name: '2a2bdf23-e73f-4a2a-913e-da29926a195c.jpeg',
          },
          '39982447-a18e-4d88-9f16-53b9df1bfdb3': {
            id: '39982447-a18e-4d88-9f16-53b9df1bfdb3',
            created: null,
            name: '39982447-a18e-4d88-9f16-53b9df1bfdb3.jpeg',
          },
          '7bf2bbd2-8749-4b37-a3d5-4498c7ea68bd': {
            id: '7bf2bbd2-8749-4b37-a3d5-4498c7ea68bd',
            created: '2019-01-23T05:54:00.352Z',
            name: '7bf2bbd2-8749-4b37-a3d5-4498c7ea68bd.jpeg',
          },
        },
      },
    };
  
    expect(selectors.sortedImageListSelector(newInitialState))
      .toEqual([
        {
          id: '2a2bdf23-e73f-4a2a-913e-da29926a195c',
          created: '2019-02-09T08:12:11.736Z',
          name: '2a2bdf23-e73f-4a2a-913e-da29926a195c.jpeg',
        },
        {
          id: '7bf2bbd2-8749-4b37-a3d5-4498c7ea68bd',
          created: '2019-01-23T05:54:00.352Z',
          name: '7bf2bbd2-8749-4b37-a3d5-4498c7ea68bd.jpeg',
        },
        {
          id: '39982447-a18e-4d88-9f16-53b9df1bfdb3',
          created: null,
          name: '39982447-a18e-4d88-9f16-53b9df1bfdb3.jpeg',
        },
      ]);
  });

  it('handle imagesByIdSelector', () => {
    expect(selectors.imagesByIdSelector(initialState))
      .toEqual(initialState.images.byId);
  });

  it('handle imagesListRequestSelector', () => {
    expect(selectors.imagesListRequestSelector(initialState))
      .toEqual(initialState.images.listImageRequest);
  });

  // add image selectors
  it('handle addImageRequestSelector', () => {
    expect(selectors.addImageRequestSelector(initialState))
      .toEqual(initialState.images.addImageRequest);
  });

  it('handle addImageIsLoading', () => {
    expect(selectors.addImageIsLoading(initialState))
      .toEqual(initialState.images.addImageRequest.loading);
  });

  // get image selectors
  it('handle getImageRequestSelector', () => {
    expect(selectors.getImageRequestSelector(initialState))
      .toEqual(initialState.images.getImageRequest);
  });

  it('handle getImageIsLoading', () => {
    expect(selectors.getImageIsLoading(initialState))
      .toEqual(initialState.images.getImageRequest.loading);
  });
});
