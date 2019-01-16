import { connect } from 'react-redux';

import { applicationUserSelector } from '../../redux/application/selectors';
import { imagesListSelector, addImageRequestSelector } from '../../redux/images/selectors';

import { listImages } from '../../redux/images';

import ListView from './ListView';

const select = state => ({
  user: applicationUserSelector(state),
  images: imagesListSelector(state),
  addImageRequest: addImageRequestSelector(state),
});

const mapDispatchToProps = ({
  listImages,
});

export default connect(select, mapDispatchToProps)(ListView);
