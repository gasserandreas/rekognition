/* global testUtils */
import * as selectors from '../selectors';

import data from '../__data__/labels';
const { labels } = data;

const imageId = '2a2bdf23-e73f-4a2a-913e-da29926a195c';

const initialState = {
  labels: {
    byId: labels.items.reduce((prev, cur) => ({
      ...prev,
      [cur.id]: cur,
    }), {}),
    idsByImageId: {
      [imageId]: labels.items.map(item => item.id),
    },
    imageId,
  },
};

describe('labels selector test suite', () => {
  it('should return labelsState state', () => {
    expect(selectors.labelsStateSelector(initialState))
      .toEqual(initialState.labels);
  });

  it('should return labelsIdsByImageId value', () => {
    expect(selectors.labelsIdsByImageIdSelector(initialState))
      .toEqual(initialState.labels.idsByImageId);
  });
  
  it('should return labelsById value', () => {
    expect(selectors.labelsByIdSelector(initialState))
      .toEqual(initialState.labels.byId);
  });

  it('should return labelsByImageId value', () => {
    const idsByImageId = selectors.labelsIdsByImageIdSelector(initialState);
    const byId = selectors.labelsByIdSelector(initialState);

    const ids = idsByImageId[imageId];

    const labels = ids.map(id => byId[id])
      .filter(label => label !== undefined);

    // const labels;
    expect(selectors.labelsByImageIdSelector(initialState, imageId))
      .toEqual(labels);
  });

  it('should return empty array for labelsByImageId without imageId', () => {
    expect(selectors.labelsByImageIdSelector(initialState, undefined))
      .toEqual([]);
  });

  it('should return empty array for labelsByImageId with wrong imageId', () => {
    expect(selectors.labelsByImageIdSelector(initialState, 'invalid'))
      .toEqual([]);
  });
});
