import { connect } from 'react-redux';

import { getImage } from '../../redux/images';
import { imagesByIdSelector, getImageRequestSelector } from '../../redux/images/selectors';

import { labelsByImageIdSelector, labelsByIdSelector } from '../../redux/labels/selectors';
import { facesByImageId, facesByIdSelector } from '../../redux/faces/selectors';

import DetailView from './DetailView';

const mapKeyToValue = (searchString) => {
  const params = {};
  let param;
  searchString
    .substring(1)
    .split('=')
    .forEach((value, i) => {
      if (i % 2 === 0) {
        // hold param name
        param = value;
      } else {
        // save value for param
        params[param] = value;
      }
    });
  return params;
};

const select = (state, props) => {
  // get image id
  const {
    match: {
      params: { id },
    },
    location: { search },
  } = props;

  const byId = imagesByIdSelector(state);
  const image = byId[id];

  const params = mapKeyToValue(search);

  return {
    image,
    labels: labelsByImageIdSelector(state, id),
    faces: facesByImageId(state, id),
    selectedFace: params.face ? facesByIdSelector(state)[params.face] || null : null,
    selectedLabel: params.label ? labelsByIdSelector(state)[params.label] || null : null,
    getImageRequest: getImageRequestSelector(state),
  };
};

const mapDispatchToProps = {
  getImage,
};

export const __testables__ = {
  select,
  mapDispatchToProps,
  mapKeyToValue,
};

export default connect(
  select,
  mapDispatchToProps,
)(DetailView);
