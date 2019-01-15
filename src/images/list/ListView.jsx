import React from 'react';
import PropTypes from 'prop-types';

import { View } from '../../ui/View';

import ImageList from './ImageList';
import AddImageButton from '../AddImageButton';

import * as Paths from '../../paths';

const ListView = (props) => {
  return (
    <View pad="none">
      <ImageList
        images={props.images}
        onImageClick={image => props.history.push(Paths.GET_IMAGES_DETAIL(image.id))}
      />
      <AddImageButton />
    </View>
  );
};

ListView.propTypes = {
  user: PropTypes.shape({}),
  images: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  listImages: PropTypes.func.isRequired,
};

ListView.defaultProps = {
  user: null,
};

export default ListView;
