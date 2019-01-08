import React from 'react';
import PropTypes from 'prop-types';

import { View, ViewHeading } from '../ui/View';

import Button from '../ui/Button';

import AddImageButton from './AddImageButton';

const ImagesView = (props) => {
  return (
    <View>
      <ViewHeading>Image collection</ViewHeading>
      <p>
        ImageView
        <Button onClick={props.listImages}>Request images</Button>
      </p>
      <AddImageButton />
    </View>
  );
};

ImagesView.propTypes = {
  user: PropTypes.shape({}),
  listImages: PropTypes.func.isRequired,
};

ImagesView.defaultProps = {
  user: null,
};

export default ImagesView;
