import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from '../ui/Header';

import * as Paths from '../paths';

const shouldShowPreviousButton = pathname => pathname !== '/';

const AppHeader = ({ isAuthenticated, username, history }) => {
  const {
    location: { pathname },
  } = history;

  return (
    <Header
      isAuthenticated={isAuthenticated}
      showPreviousButton={shouldShowPreviousButton(pathname)}
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

export const __testables__ = {
  AppHeader,
  shouldShowPreviousButton,
};

export default withRouter(AppHeader);
