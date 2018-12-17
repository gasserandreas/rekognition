import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { css } from 'emotion';

import NotFound from './ui/NotFound';

import * as Paths from './paths';

import HomeContainer from './home/HomeContainer';

import { reportReactError, createUnknownError } from './util/ErrorHandler';
import { loadApplication } from './redux/application';

const Styles = {
  ApplicationWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    height: 100%;
  `,
  Content: css`
    flex-grow: 1;
    flex-shrink: 1;
  `,
};

class App extends Component {
  static propTypes = {
    loadApplication: PropTypes.func.isRequired,
    reportReactError: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadApplication();
  }

  componentDidCatch(error, info) {
    // handle error on root level
    this.props.reportReactError(createUnknownError(error, info));
  }

  render() {
    return (
      <div className={Styles.ApplicationWrapper}>
        <main role="main" className={Styles.Content}>
          <Switch>
            <Route exact path={Paths.HOME} component={HomeContainer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

const select = () => ({});

const mapDispatchToProps = ({
  reportReactError,
  loadApplication,
});

export default withRouter(connect(select, mapDispatchToProps)(App));
