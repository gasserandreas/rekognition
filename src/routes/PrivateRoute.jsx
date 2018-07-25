import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Paths from './paths';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => auth.isAuthenticated ? (
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
    // render={props =>
    //   fakeAuth.isAuthenticated ? (
    //     <Component {...props} />
    //   ) : (
    //     <Redirect
    //       to={{
    //         pathname: "/login",
    //         state: { from: props.location }
    //       }}
    //     />
    //   )
    // }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

// export default PrivateRoute;

