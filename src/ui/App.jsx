/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';

import '@atlaskit/css-reset';

// redux
import { selectIsAuthenticated } from '../redux/auth/selectors';

// base style components
import GlobalNav from './GlobalNav';
import PrivateRoute from './PrivateRoute';

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
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div css={Styles.AppWrapper}>
        <GlobalNav isAuthenticated={isAuthenticated} />
        <div css={Styles.Page}>
          <Switch>
            <Route exact path={Paths.HOME} component={HomeContainer} />
            <PrivateRoute exact path={Paths.IMAGES} component={ImagesContainer} isAuthenticated={isAuthenticated} />
            <PrivateRoute exact path={Paths.USER} component={UserContainer} isAuthenticated={isAuthenticated} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
