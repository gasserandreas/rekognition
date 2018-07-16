import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomeContainer from '../pages/home/HomeContainer';
import AnalyseView from '../pages/analyse/AnalyseView';
import NotFound from '../pages/misc/NotFound';

import DetailsRoutes from './details';

import * as Paths from './paths';

const AppRoutes = () => (
  <Switch>
    <Route exact path={Paths.INDEX} component={AnalyseView} />
    <Route exact path={Paths.HOME} component={AnalyseView} />
    <Route path={Paths.DETAIL} component={DetailsRoutes} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default AppRoutes;
