import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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

PrivateRoute.propTypes = {};

export default PrivateRoute;
