/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grommet, Box } from 'grommet';

// base style components
import AppMessage from './AppMessage';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppRoutes from './AppRoutes';

import AppLoadingView from './AppLoadingView';

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
    didLoad: PropTypes.bool.isRequired,
    username: PropTypes.string,
    message: PropTypes.shape({
      show: PropTypes.bool,
      showRefresh: PropTypes.bool,
      text: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    username: undefined,
  }

  render() {
    const {
      isAuthenticated,
      didLoad,
      username,
      message,
    } = this.props;

    return (
      <Grommet theme={Theme} full>
        <AppMessage
          message={message}
        />
        <AppHeader
          isAuthenticated={isAuthenticated}
          username={username}
        />
        <StyledAppContent fill justify="between" direction="column">
          <Box flex fill pad="none">
            { didLoad
              ? <AppRoutes id="jestAppRoutes" isAuthenticated={isAuthenticated} />
              : <AppLoadingView />
            }
            <AppFooter />
          </Box>
        </StyledAppContent>
      </Grommet>
    );
  }
}

export default App;
