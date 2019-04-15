import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grommet, Box } from 'grommet';
import { Switch, Route, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// // redux
// import { logOutUser } from '../redux/auth';
// import { isAuthenticatedSelector, authUsernameSelector } from '../redux/auth/selectors';

// import { loadApplication } from '../redux/application';
// import {
//   messageShowSelector,
//   messageTextSelector,
//   messageTitleSelector,
//   messageShowRefreshSelector,
// } from '../redux/application/message/selectors';

// base style components
import PrivateRoute from './PrivateRoute';
import AppMessage from './AppMessage';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

import ImagesContainer from '../images/list/Container';
import ImagesDetailContainer from '../images/detail/Container';
import UserContainer from '../user/Container';

import LoginContainer from '../auth/login/Container';
import RegisterContainer from '../auth/register/Container';

import Privacy from './Privacy';
import NotFound from './NotFound';

import * as Paths from '../paths';

import { Theme } from '../styles';

const StyledAppContent = styled(Box)`
  min-height: 100%;
  height: auto;
`;

/**
 * Attention: Do NOT convert this comp to state-less component due major issues
 * with react-router-dom and state-less root components
 */
class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.loadApplication();
  }

  render() {
    const { isAuthenticated, username, message } = this.props;
    console.log('test');
    return (
      <Grommet theme={Theme} full={true}>
        <AppMessage
          message={message}
        />
        <AppHeader
          isAuthenticated={isAuthenticated}
          username={username}
        />
        <StyledAppContent fill justify='between' direction='column'>
          <Box flex fill pad="none">
            <Switch>
              <PrivateRoute
                exact
                path={Paths.HOME}
                component={ImagesContainer}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                exact
                path={Paths.IMAGES}
                component={ImagesContainer}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                exact
                path={Paths.GET_IMAGES_DETAIL(Paths.ID)}
                component={ImagesDetailContainer}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                exact path={Paths.USER}
                component={UserContainer}
                isAuthenticated={isAuthenticated}
              />
              <Route exact path={Paths.LOGIN} component={LoginContainer} />
              <Route exact path={Paths.REGISTER} component={RegisterContainer} />
              <Route exact path={Paths.PRIVACY} component={Privacy} />
              <Route path="*" component={NotFound} />
            </Switch>
            <AppFooter />
          </Box>
        </StyledAppContent>
      </Grommet>
    );
  }
}

export default App;

// const mapStateToProps = (state) => ({
//   isAuthenticated: isAuthenticatedSelector(state),
//   username: authUsernameSelector(state),
//   message: {
//     show: messageShowSelector(state),
//     text: messageTextSelector(state),
//     title: messageTitleSelector(state),
//     showRefresh: messageShowRefreshSelector(state),
//   },
// });

// const mapDispatchToProps = ({
//   loadApplication,
//   logOutUser,
// });

// export const __testables__ = {
//   App,
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
