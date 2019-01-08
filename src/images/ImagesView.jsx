import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';

import { getUrl } from '../util/services/networkUtils';

import { View, ViewHeading } from '../ui/View';
import Button from '../ui/Button';

import AddImageButton from './AddImageButton';

const ImagesView = (props) => {
  return (
    <View>
      <ViewHeading>Image collection</ViewHeading>
      <Box fill>
        <p>
          ImageView
          <Button onClick={props.listImages}>Request images</Button>
        </p>
      </Box>
      <Box fill>
        {props.images.map((image) => {
          const { path } = image;
          const src = `${getUrl('thumb')}/${path}`;

          return (
            <Box height="small" width="small" border>
              <Image src={src} fit="cover" />
            </Box>
          );
        })}
      </Box>
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
