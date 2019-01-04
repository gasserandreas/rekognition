import React from 'react';
import PropTypes from 'prop-types';

import { View, ViewHeading } from '../ui/View';

import AddImageButton from './AddImageButton';

const ImagesView = (props) => {
  return (
    <View>
      <ViewHeading>Image collection</ViewHeading>
      <p>
        ImageView
      </p>
      <AddImageButton />
    </View>
  );
};

ImagesView.propTypes = {
  user: PropTypes.shape({}),
};

ImagesView.defaultProps = {
  user: null,
};

export default ImagesView;
