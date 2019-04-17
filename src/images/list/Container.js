import { connect } from 'react-redux';

import { sortedImageListSelector, addImageRequestSelector } from '../../redux/images/selectors';

import { listImages } from '../../redux/images';

import ListView from './ListView';

const select = state => ({
  images: sortedImageListSelector(state),
  addImageRequest: addImageRequestSelector(state),
});

const mapDispatchToProps = ({
  listImages,
});

export default connect(select, mapDispatchToProps)(ListView);
