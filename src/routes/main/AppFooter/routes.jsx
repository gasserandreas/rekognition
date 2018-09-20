import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppFooter from './AppFooter';

import * as Paths from '../../../enums/Paths';

const showSideBarPaths = [
  Paths.GET_IMAGES_DETAILS(Paths.ID),
  Paths.INDEX,
  Paths.HOME,
];

const DefaultFooter = () => <AppFooter />;
const SideBarFooter = () => <AppFooter sidebar />;

const footerRoutes = () => (
  <Switch>
    {showSideBarPaths.map((path) => (
      <Route key={`footer_route_for_${path}`} exact path={path} component={SideBarFooter} />
    ))}
    <Route path="*" component={DefaultFooter} />
  </Switch>
);

export default footerRoutes;
