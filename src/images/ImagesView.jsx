import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from 'grommet';

const ImagesView = (props) => {
  return (
    <div>
      <Heading level="2">Image collection</Heading>
      <p>
        ImageView
      </p>
    </div>
  );
};

ImagesView.propTypes = {
  user: PropTypes.shape({}),
};

ImagesView.defaultProps = {
  user: null,
};

export default ImagesView;
