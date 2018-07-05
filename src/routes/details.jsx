import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DetailsView from '../pages/details/DetailsView';
import DetailsAddView from '../pages/details/DetailsAddView';

import * as Paths from './paths';

const DetailsRoutes = () => (
  <Switch>
    <Route exact path={Paths.DETAIL_ADD} component={DetailsAddView} />
    <Route path={Paths.DETAIL} component={DetailsView} />
  </Switch>
);

export default DetailsRoutes;
