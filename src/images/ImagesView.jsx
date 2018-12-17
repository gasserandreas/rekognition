import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from 'emotion';

const Styles = {
  Jumbotron: css`
    width: 60%;
    margin: 8rem auto;
  `,
};

const ImagesView = (props) => {
  const { user } = props;

  return (
    <div className="details-view">
      Images
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
