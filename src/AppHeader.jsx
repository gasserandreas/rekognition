import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import NavigationContainer from './components/Navigation/NavigationContainer';

const AppHeader = ({ isAuthenticated, user }) => {
  return (isAuthenticated && (
    <div className="application-header">
      <Header user={user} />
      <NavigationContainer />
    </div>
  ));
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({}),
};

// redux part
const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, user } = auth;

  return {
    user,
    isAuthenticated,
  };
};

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
