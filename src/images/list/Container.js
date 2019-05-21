import { connect } from 'react-redux';

import { sortedImageListSelector, addImageRequestSelector } from '../../redux/images/selectors';

import imagesReducer, { listImages } from '../../redux/images';

import ListView from './ListView';

import getStore from '../../redux/getStore';

const { store } = getStore();
store.injectReducer('images', imagesReducer);

const select = state => ({
  images: sortedImageListSelector(state),
  addImageRequest: addImageRequestSelector(state),
});

const mapDispatchToProps = {
  listImages,
};

export const __testables__ = {
  select,
  mapDispatchToProps,
};

export default connect(
  select,
  mapDispatchToProps,
)(ListView);
