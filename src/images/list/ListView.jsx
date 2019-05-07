import React from 'react';
import PropTypes from 'prop-types';

import { View } from '../../ui/View';

import ImageList from './ImageList';
import AddImageButton from '../AddImageButton';

import { HOCRequestPropTypes } from '../../util/PropTypes';

import * as Paths from '../../paths';

const ListView = props => (
  <View pad="none">
    <ImageList
      images={props.images}
      addImageRequest={props.addImageRequest}
      onImageClick={image => props.history.push(Paths.GET_IMAGES_DETAIL(image.id))}
    />
    <AddImageButton />
  </View>
);

ListView.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addImageRequest: HOCRequestPropTypes.isRequired,
};

ListView.defaultProps = {};

export default ListView;
