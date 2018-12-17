import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from 'emotion';

const Styles = {
  Jumbotron: css`
    width: 60%;
    margin: 8rem auto;
  `,
};

const HomeView = (props) => {
  const { user } = props;

  return (
    <div className="details-view">
      Hello ;-)
    </div>
  );
};

HomeView.propTypes = {
  user: PropTypes.shape({}),
};

HomeView.defaultProps = {
  user: null,
};

export default HomeView;
