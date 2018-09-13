import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Paths from '../../enums/Paths';

import UserView from '../user/UserContainer';

const routes = () => (
  <Switch>
    <Route path={Paths.GET_USER_PATHS(Paths.ID)} component={UserView} />
    {/* <Route exact path={Paths.IMAGES} component={ImageList} />
    <Route path={Paths.GET_IMAGES_DETAILS(Paths.ID)} component={ImageDetail} /> */}
    {/* <Route path="*" component={null} /> */}
  </Switch>
);

export default routes;
