import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AppLoadingView from './AppLoadingView';

import * as Paths from '../paths';

const ImagesContainer = React.lazy(() => import('../images/list/Container'));
const ImagesDetailContainer = React.lazy(() => import('../images/detail/Container'));
const UserContainer = React.lazy(() => import('../user/Container'));

const LoginContainer = React.lazy(() => import('../auth/login/Container'));
const RegisterContainer = React.lazy(() => import('../auth/register/Container'));

const Privacy = React.lazy(() => import('./Privacy'));
const NotFound = React.lazy(() => import('./NotFound'));

const AppRoutes = ({ isAuthenticated }, ...props) => (
  <Suspense fallback={<AppLoadingView />}>
    <Switch {...props}>
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
  </Suspense>
);

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AppRoutes;
