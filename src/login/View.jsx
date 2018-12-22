/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

import LoginForm from './LoginForm';

import Card from '../ui/Card';

import * as Paths from '../paths';
import { HOCRequestPropTypes } from '../ui/PropTypes';
import { Colors } from '../styles';

const Styles = {
  View: css`
    background-color: ${Colors.Blue.Background};
    color: ${Colors.White.default};
    height: 100vh;
  `,
  Content: css`
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
    padding: 3rem 0;
  `,
  PageHeader: css`
    text-transform: uppercase;
    font-size: 2.2rem;
    color: ${Colors.White.default};
    text-align: center;
  `,
  SubHeader: css`
    color: ${Colors.White.default};
    margin: 3rem 0;
    text-align: center;
  `,
}

class View extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginRequest: HOCRequestPropTypes.isRequired,
  }

  // onFormSubmit = this.onFormSubmit.bind(this);

  state = {
    submitting: false,
  };

  componentWillMount() {
    const { isAuthenticated } = this.props;
    this.checkAuth(isAuthenticated);
  }

  componentWillReceiveProps(newProps) {
    const { isAuthenticated } = newProps;

    if (this.props.isAuthenticated !== isAuthenticated) {
      this.checkAuth(isAuthenticated);
    }
  }

  checkAuth(isAuthenticated) {
    if (isAuthenticated) {
      //
      setTimeout(() => {
        this.props.history.push(Paths.HOME);
      }, 500);
    }
  }

  render() {
    const { loginRequest: { loading } } = this.props;
    return (
      <div css={Styles.View}>
        <div css={Styles.Content}>
          <h1 css={Styles.PageHeader}>AWS Rekognition</h1>
          <h1 css={Styles.SubHeader}>Login to get started</h1>
          <Card>
            <LoginForm
              onSubmit={this.props.logInUser}
              submitting={loading}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default View;
