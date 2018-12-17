import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeNav from '../home/nav/NavContainer';
import ImagesNav from '../images/nav/NavContainer';
import UserNav from '../user/nav/NavContainer';

import * as Paths from '../paths';

export default class ContainerNav extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={Paths.HOME} component={HomeNav} />
        <Route exact path={Paths.IMAGES} component={ImagesNav} />
        <Route exact path={Paths.USER} component={UserNav} />
        <Route path="*" component={() => null} />
      </Switch>
    );
  }
}