import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import { View } from '../../ui/View';

import ListTopBar from './ListTopBar';
import ImageList from './ImageList';
import AddImageButton from '../AddImageButton';

import * as Paths from '../../paths';

const ImagesView = (props) => {
  return (
    <View
      topBar={<ListTopBar listImages={props.listImages} />}
      pad="none"
    >
      <ImageList
        images={props.images}
        onImageClick={image => props.history.push(Paths.GET_IMAGES_DETAIL(image.id))}
      />
      <AddImageButton />
    </View>
  );
};

ImagesView.propTypes = {
  user: PropTypes.shape({}),
  images: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  listImages: PropTypes.func.isRequired,
};

ImagesView.defaultProps = {
  user: null,
};

export default ImagesView;
