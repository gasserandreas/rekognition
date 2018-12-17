import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  LayoutManager,
  NavigationProvider,
} from '@atlaskit/navigation-next';

// base style components
import GlobalNavigation from './GlobalNav';
import ContainerNav from './ContainerNav';

// route imports
import HomeContainer from '../home/HomeContainer';
import ImagesContainer from '../images/ImagesContainer';
import UserContainer from '../user/UserContainer';

import NotFound from './NotFound';

import * as Paths from '../paths';

/**
 * Attention: Do NOT convert this comp to state-less component due major issues
 * with react-router-dom and state-less root components
 */
class App extends Component { 
  render() {
    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={GlobalNavigation}
          productNavigation={() => null}
          containerNavigation={ContainerNav}
        >
        {/* specify app routes here */}
          <Switch>
            <Route exact path={Paths.HOME} component={HomeContainer} />
            <Route exact path={Paths.IMAGES} component={ImagesContainer} />
            <Route exact path={Paths.USER} component={UserContainer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </LayoutManager>
      </NavigationProvider>
    );
  }
}

export default App;
