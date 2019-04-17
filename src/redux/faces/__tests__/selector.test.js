/* global testUtils */
import * as selectors from '../selectors';

import data from '../__data__/faces';
const { faces } = data;

const imageId = '2a2bdf23-e73f-4a2a-913e-da29926a195c';

const initialState = {
  faces: {
    byId: faces.items.reduce((prev, cur) => ({
      ...prev,
      [cur.id]: cur,
    }), {}),
    idsByImageId: {
      [imageId]: faces.items.map(item => item.id),
    },
    imageId,
  },
};

describe('faces selector test suite', () => {
  it('should return empty object for null state', () => {
    expect(selectors.facesStateSelector({}))
      .toEqual({});
  });

  it('should return facesState state', () => {
    expect(selectors.facesStateSelector(initialState))
      .toEqual(initialState.faces);
  });

  it('should return facesIdsByImageId value', () => {
    expect(selectors.facesIdsByImageIdSelector(initialState))
      .toEqual(initialState.faces.idsByImageId);
  });
  
  it('should return facesById value', () => {
    expect(selectors.facesByIdSelector(initialState))
      .toEqual(initialState.faces.byId);
  });

  it('should return facesByImageId value', () => {
    const idsByImageId = selectors.facesIdsByImageIdSelector(initialState);
    const byId = selectors.facesByIdSelector(initialState);

    const ids = idsByImageId[imageId];

    const faces = ids.map(id => byId[id])
    .filter(face => face !== undefined);

    // const labels;
    expect(selectors.facesByImageId(initialState, imageId))
      .toEqual(faces);
  });

  it('should return empty array for facesByImageId without imageId', () => {
    expect(selectors.facesByImageId(initialState, undefined))
      .toEqual([]);
  });

  it('should return empty array for facesByImageId with wrong imageId', () => {
    expect(selectors.facesByImageId(initialState, 'invalid'))
      .toEqual([]);
  });
});
