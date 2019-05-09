/* global it testUtils */
import reducer, * as reduxFaces from '../index';

import data from '../__data__/faces';

const { __testables__ } = reduxFaces;

const mockData = {
  imageId: '2a2bdf23-e73f-4a2a-913e-da29926a195c',
};

describe('faces simple action test suite', () => {
  it('should handle facesAddFaces', () => {
    const { faces } = data;
    const { imageId } = mockData;

    // generate output
    const ids = [];
    const byId = {};
    faces.items.forEach((face) => {
      const { id } = face;

      ids.push(id);
      byId[id] = face;
    });

    // test function
    expect(reduxFaces.facesAddFaces(imageId, faces.items)).toEqual({
      type: __testables__.FACES_ADD_FACES,
      payload: {
        imageId,
        ids,
        byId,
      },
    });
  });
});

describe('faces reducer test suite', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, testUtils.dummyTestAction())).toEqual({
      byId: {},
      idsByImageId: {},
    });
  });

  it('should handle FACES_ADD_FACES', () => {
    const { faces } = data;
    const { imageId } = mockData;

    // generate output
    const ids = [];
    const byId = {};
    faces.items.forEach((face) => {
      const { id } = face;

      ids.push(id);
      byId[id] = face;
    });

    expect(reducer(undefined, reduxFaces.facesAddFaces(imageId, faces.items))).toEqual({
      byId,
      idsByImageId: {
        [imageId]: ids,
      },
    });
  });
});
