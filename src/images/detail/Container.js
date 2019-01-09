import { connect } from 'react-redux';

import { getImage } from '../../redux/images';
import { imagesByIdSelector } from '../../redux/images/selectors';

import { labelsByImageId } from '../../redux/labels/selectors';
import { facesByImageId } from '../../redux/faces/selectors';

import DetailView from './DetailView';

const select = (state, props) => {
  // get image id
  const { match: { params: { id } } } = props;

  const byId = imagesByIdSelector(state);
  const image = byId[id];

  return {
    image,
    labels: labelsByImageId(state, id),
    faces: facesByImageId(state, id),
  };
};

const mapDispatchToProps = ({
  getImage,
});

export default connect(select, mapDispatchToProps)(DetailView);
