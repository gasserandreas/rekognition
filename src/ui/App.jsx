/** @jsx jsx */
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { jsx, css } from '@emotion/core';

import '@atlaskit/css-reset';

// base style components
import GlobalNav from './GlobalNav';

// route imports
import HomeContainer from '../home/HomeContainer';
import ImagesContainer from '../images/ImagesContainer';
import UserContainer from '../user/UserContainer';

import NotFound from './NotFound';

import * as Paths from '../paths';
// bg color: #0747A6

import { MediaSize } from '../styles';

const Styles = {
  AppWrapper: css`
    @media (min-width: ${MediaSize.Tablet}) {
      display: flex;
      flex-wrap: nowrap;
      flex-flow: row;
    }
  `,
  Page: css`
    flex-shrink: 1;
    flex-grow: 1;
  `,
};

/**
 * Attention: Do NOT convert this comp to state-less component due major issues
 * with react-router-dom and state-less root components
 */
class App extends Component { 
  render() {
    return (
      <div css={Styles.AppWrapper}>
        <GlobalNav authenticated />
        <div css={Styles.Page}>
          <Switch>
            <Route exact path={Paths.HOME} component={HomeContainer} />
            <Route exact path={Paths.IMAGES} component={ImagesContainer} />
            <Route exact path={Paths.USER} component={UserContainer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
  //   return (
  //     <NavigationProvider>
  //       <MobileHeader
  //         drawerState="navigation"
  //         menuIconLabel={'Menu'}
  //         navigation={isOpen => isOpen && (<div>
  //           <GlobalNavigation />
  //           <ContainerNav />
  //         </div>)}
  //       />
  //       {!isOpen && (
  //       <LayoutManager
  //         globalNavigation={GlobalNavigation}
  //         productNavigation={() => null}
  //         containerNavigation={ContainerNav}
  //         themeMode="settings"
  //       >
  //       {/* specify app routes here */}
  //         <Switch>
  //           <Route exact path={Paths.HOME} component={HomeContainer} />
  //           <Route exact path={Paths.IMAGES} component={ImagesContainer} />
  //           <Route exact path={Paths.USER} component={UserContainer} />
  //           <Route path="*" component={NotFound} />
  //         </Switch>
  //       </LayoutManager>
  //       )}
  //     </NavigationProvider>
  //   );
  // }
}

export default App;
