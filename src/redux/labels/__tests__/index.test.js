/* global it testUtils */
import reducer, * as reduxLabels from '../index';

import data from '../__data__/labels.json';

const { __testables__ } = reduxLabels;

const mockData = {
  imageId: '2a2bdf23-e73f-4a2a-913e-da29926a195c',
};

describe('labels simple action test suite', () => {
  it('should handle labelsAddLabels', () => {
    const { labels } = data;
    const { imageId } = mockData;

    // generate output
    const ids = [];
    const byId = {};
    labels.items.forEach((face) => {
      const { id } = face;

      ids.push(id);
      byId[id] = face;
    });

    // test function
    expect(reduxLabels.labelsAddLabels(imageId, labels.items)).toEqual({
      type: __testables__.LABELS_ADD_LABELS,
      payload: {
        imageId,
        ids,
        byId,
      },
    });
  });
});

describe('labels reducer test suite', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, testUtils.dummyTestAction())).toEqual({
      byId: {},
      idsByImageId: {},
    });
  });

  it('should handle FACES_ADD_FACES', () => {
    const { labels } = data;
    const { imageId } = mockData;

    // generate output
    const ids = [];
    const byId = {};
    labels.items.forEach((label) => {
      const { id } = label;

      ids.push(id);
      byId[id] = label;
    });

    expect(reducer(undefined, reduxLabels.labelsAddLabels(imageId, labels.items))).toEqual({
      byId,
      idsByImageId: {
        [imageId]: ids,
      },
    });
  });
});
