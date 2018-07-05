import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from '../pages/home/HomeContainer';
import NotFound from '../pages/misc/NotFound';

import DetailsRoutes from './details';

import * as Paths from './paths';

const AppRoutes = () => (
  <Switch>
    <Route exact path={Paths.INDEX} component={HomeContainer} />
    <Route exact path={Paths.HOME} component={HomeContainer} />
    <Route path={Paths.DETAIL} component={DetailsRoutes} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default AppRoutes;
