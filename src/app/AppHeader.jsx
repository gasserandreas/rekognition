import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from '../ui/Header';

import * as Paths from '../paths';

const AppHeader = ({
  isAuthenticated,
  username,
  history,
}) => {
  const { location: { pathname } } = history;
  const showPreviousButton = pathname !== '/';

  return (
    <Header
      isAuthenticated={isAuthenticated}
      showPreviousButton={showPreviousButton}
      username={username}
      onGoToPrevious={() => history.push(Paths.HOME)}
    />
  );
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

AppHeader.defaultProps = {
  username: '',
};

export default withRouter(AppHeader);
