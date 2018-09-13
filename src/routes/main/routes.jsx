import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';

import ImageRoutes from '../images/routes'
import UserRoutes from '../user/routes';

import Register from '../register/RegisterContainer';
import Login from '../login/LoginContainer';
import IndexView from '../index/IndexContainer';

import NotFound from '../misc/not-found/NotFound';
import Privacy from '../misc/privacy/PrivacyView'; 

import * as Paths from '../../enums/Paths';

const redirectRender = () => <Redirect to={Paths.HOME} />;

const routes = () => (
  <Switch>
    <Route exact path={Paths.HOME} component={IndexView} />
    <Route exact path={Paths.INDEX} render={redirectRender} />
    <PrivateRoute path={Paths.IMAGES} component={ImageRoutes} />
    <PrivateRoute path={Paths.USER} component={UserRoutes} />
    <Route exact path={Paths.REGISTER} component={Register} />
    <Route exact path={Paths.LOGIN} component={Login} />
    <Route exact path={Paths.PRIVACY} component={Privacy} />
    <PrivateRoute path="*" component={NotFound} />
  </Switch>
);

export default routes;
