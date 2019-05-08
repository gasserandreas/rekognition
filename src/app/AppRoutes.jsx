import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import ImagesContainer from '../images/list/Container';
import ImagesDetailContainer from '../images/detail/Container';
import UserContainer from '../user/Container';

import LoginContainer from '../auth/login/Container';
import RegisterContainer from '../auth/register/Container';

import Privacy from './Privacy';
import NotFound from './NotFound';

import * as Paths from '../paths';

const AppRoutes = ({ isAuthenticated }) => (
  <Switch>
    <PrivateRoute exact path={Paths.HOME} component={ImagesContainer} isAuthenticated={isAuthenticated} />
    <PrivateRoute exact path={Paths.IMAGES} component={ImagesContainer} isAuthenticated={isAuthenticated} />
    <PrivateRoute
      exact
      path={Paths.GET_IMAGES_DETAIL(Paths.ID)}
      component={ImagesDetailContainer}
      isAuthenticated={isAuthenticated}
    />
    <PrivateRoute exact path={Paths.USER} component={UserContainer} isAuthenticated={isAuthenticated} />
    <Route exact path={Paths.LOGIN} component={LoginContainer} />
    <Route exact path={Paths.REGISTER} component={RegisterContainer} />
    <Route exact path={Paths.PRIVACY} component={Privacy} />
    <Route path="*" component={NotFound} />
  </Switch>
);

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AppRoutes;
