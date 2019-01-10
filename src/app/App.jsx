import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grommet, Box } from 'grommet';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// redux
import { isAuthenticatedSelector, authUsernameSelector } from '../redux/auth/selectors';

import { logOutUser } from '../redux/auth';
import { loadApplication } from '../redux/application';

// base style components
import PrivateRoute from './PrivateRoute';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

// route imports
import PlaygroundContainer from '../playground/PlaygroundContainer';

import ImagesContainer from '../images/Container';
// import ImagesDetailContainer from '../images/detail/Container';
import UserContainer from '../user/UserContainer';

import LoginContainer from '../auth/login/Container';
import RegisterContainer from '../auth/register/Container';

import NotFound from './NotFound';

import * as Paths from '../paths';

import { Colors } from '../styles';

import img from './app_background.png';

const theme = {
  global: {
    colors: {
      brand: Colors.ColorsPalette.Brand,
      background: Colors.ColorsPalette.White,
      focus: 'rgba(0, 0, 0, 0.33)',
      'neutral-1': Colors.Neutrals.DarkNeutrals,
      'neutral-2': Colors.Neutrals.MidDark,
      'neutral-3': Colors.Neutrals.LightDark,
      'accent-1': Colors.Blue.Light,
      'accent-2': Colors.Black.Default,
      'status-critical': Colors.Red.Dark,
      'status-warning': Colors.Red.Default,
      'status-ok': Colors.Green.Default,
      'status-unknown': Colors.Neutrals.Mid,
      'status-disabled': Colors.Neutrals.Mid,
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
  checkBox: {
    gap: "xsmall",
    size: "18px",
  },
};

const StyledAppContent = styled(Box)`
  background: url(${img});
  padding-top: 3.5rem;
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
    const { isAuthenticated, username } = this.props;

    return (
      <Grommet theme={theme} full={true}>
        <AppHeader />
        <StyledAppContent fill justify="between" direction="column">
          <Switch>
            <PrivateRoute
              exact
              path={Paths.HOME}
              component={ImagesContainer}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path={Paths.PLAYGROUND} component={PlaygroundContainer} />
            <Route exact path={Paths.LOGIN} component={LoginContainer} />
            <Route exact path={Paths.REGISTER} component={RegisterContainer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </StyledAppContent>
        {/* <AppHeader isAuthenticated={isAuthenticated} username={username} />
        <Box fill justify='between' direction='column'>
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
              <Route exact path={Paths.PLAYGROUND} component={PlaygroundContainer} />
              <Route exact path={Paths.LOGIN} component={LoginContainer} />
              <Route exact path={Paths.REGISTER} component={RegisterContainer} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Box>
          { isAuthenticated && (
            <Box tag='footer' direction='column' align='center' pad={{ vertical: 'xsmall' }} >
              <AppFooter />
            </Box>
          )}
        </Box> */}
      </Grommet>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  username: authUsernameSelector(state),
});

const mapDispatchToProps = ({
  loadApplication,
  logOutUser,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
