import { combineReducers } from 'redux';

// type definition
const LABELS_ADD = 'LABELS_ADD';

// simple actions
const labelsAdd = (imageId, rawLabels) => {
  const labels = rawLabels.Labels.map((label) => {
    const { Name, Confidence } = label;
    return {
      key: Name,
      value: Confidence,
    };
  });

  return {
    type: LABELS_ADD,
    imageId,
    labels,
  };
};

// reducers
const byImageId = (state  = {}, action) => {
  switch (action.type) {
    case LABELS_ADD:
      return {
        ...state,
        [action.imageId]: action.labels,
      };
    default:
      return state;
  }
}

export {
  labelsAdd,
};

export default combineReducers({
  byImageId,
});
