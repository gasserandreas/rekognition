import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Paths from '../paths';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: Paths.LOGIN,
          state: { from: props.location },
        }}
      />
    ))
      }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}),
};

PrivateRoute.defaultProps = {
  location: undefined,
};

export default PrivateRoute;
