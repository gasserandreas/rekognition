import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from 'emotion';

const Styles = {
  Jumbotron: css`
    width: 60%;
    margin: 8rem auto;
  `,
};

const UserView = (props) => {
  const { user } = props;

  return (
    <div className="details-view">
      User
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({}),
};

UserView.defaultProps = {
  user: null,
};

export default UserView;
