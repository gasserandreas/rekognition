import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectIsAuthenticated } from '../redux/selectors/app';

import * as Paths from '../enums/Paths';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: Paths.REGISTER,
            state: { from: props.location }
          }}
        />
      )
    } 
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);