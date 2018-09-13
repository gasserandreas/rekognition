import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UploadButton from './UploadButtonContainer';

import * as Paths from '../../../enums/Paths';

const showUploadButton = [
  Paths.GET_IMAGES_DETAILS(Paths.ID),
  Paths.IMAGES,
];

const uploadRoutes = () => (
  <Switch>
    {showUploadButton.map((path) => (
      <Route key={`upload_button_route_for_${path}`} path={path} component={UploadButton} />
    ))}
    <Route path="*" component={null} />
  </Switch>
);

export default uploadRoutes;
