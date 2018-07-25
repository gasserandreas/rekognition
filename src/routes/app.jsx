import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import AnalyseView from '../pages/analyse/AnalyseView';
import RegisterContainer from '../pages/register/RegisterContainer';
import NotFound from '../pages/misc/NotFound';

import * as Paths from './paths';

const AppRoutes = () => (
  <Switch>
    <PrivateRoute exact path={Paths.HOME} component={AnalyseView} />
    <Route exact path={Paths.REGISTER} component={RegisterContainer} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default AppRoutes;
