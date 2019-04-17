import { connect } from 'react-redux';

import { getImage } from '../../redux/images';
import { imagesByIdSelector, getImageRequestSelector } from '../../redux/images/selectors';


import { labelsByImageIdSelector, labelsByIdSelector } from '../../redux/labels/selectors';
import { facesByImageId, facesByIdSelector } from '../../redux/faces/selectors';

import DetailView from './DetailView';

const select = (state, props) => {
  // get image id
  const {
    match: { params: { id } },
    location: { search },
  } = props;

  const byId = imagesByIdSelector(state);
  const image = byId[id];

  // map to key / value array
  const params = {};
  let param;
  search.substring(1)
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

  return {
    image,
    labels: labelsByImageIdSelector(state, id),
    faces: facesByImageId(state, id),
    selectedFace: params.face
      ? facesByIdSelector(state)[params.face] || null
      : null,
    selectedLabel: params.label
      ? labelsByIdSelector(state)[params.label] || null
      : null,
    getImageRequest: getImageRequestSelector(state),
  };
};

const mapDispatchToProps = ({
  getImage,
});

export default connect(select, mapDispatchToProps)(DetailView);
