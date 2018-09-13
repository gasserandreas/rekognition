import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ImageList from './list/ImageListContainer';
import ImageDetail from './detail/ImageDetailContainer';

import * as Paths from '../../enums/Paths';

const routes = () => (
  <Switch>
    <Route exact path={Paths.IMAGES} component={ImageList} />
    <Route path={Paths.GET_IMAGES_DETAILS(Paths.ID)} component={ImageDetail} />
  </Switch>
);

export default routes;
