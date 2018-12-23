/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';

import Card from '../ui/Card';

import * as Paths from '../paths';
import { HOCRequestPropTypes } from '../ui/PropTypes';
import { Colors } from '../styles';

const Styles = {
  View: css`
    background-color: ${Colors.Blue.Background};
    color: ${Colors.White.default};
    min-height: 100vh;
  `,
  Content: css`
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 3rem 0;
  `,
  PageHeader: css`
    text-transform: uppercase;
    font-size: 2.2rem;
    color: ${Colors.White.default};
    text-align: center;
    margin-bottom: 2rem;
  `,
  LoginLink: css`
    color: ${Colors.White.default};
    text-align: center;
    margin: 2.5rem 0 0;
    display: block;

    &:hover {
      color: ${Colors.White.default};
      text-decoration: underline;
      cursor: pointer;
    }
  `,
}

class View extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signupRequest: HOCRequestPropTypes.isRequired,
    signupUser: PropTypes.func.isRequired,
  }

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
    const { signupRequest: { loading } } = this.props;
    return (
      <div css={Styles.View}>
        <div css={Styles.Content}>
          <h1 css={Styles.PageHeader}>AWS Rekognition</h1>
          <Card>
            <RegisterForm
              onSubmit={this.props.signupUser}
              submitting={loading}
            />
          </Card>
          <Link
            css={Styles.LoginLink}
            to={Paths.LOGIN}
          >Use login credentials instead</Link>
        </div>
      </div>
    );
  }
}

export default View;
