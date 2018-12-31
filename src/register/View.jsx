/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

import CheckEmailForm from './CheckEmailForm';
import RegisterForm from './RegisterForm';

import Card from '../ui/Card';

import * as Paths from '../paths';
import { HOCRequestPropTypes } from '../util/PropTypes';
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
    checkEmail: PropTypes.func.isRequired,
  }

  onCheckEmail = this.onCheckEmail.bind(this);
  onSignupUser = this.onSignupUser.bind(this);

  state = {
    submitting: false,
    email: '',
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

  onCheckEmail(email) {
    this.setState({ email });
    this.props.checkEmail(email);
  }

  onSignupUser({ email_disabled, ...data }) {
    const newData = {
      ...data,
      email: this.state.email,
    };
    
    this.props.signupUser(newData);
  }

  render() {
    const {
      signupRequest,
      checkEmailRequest,
      validEmail,
    } = this.props;
    return (
      <div css={Styles.View}>
        <div css={Styles.Content}>
          <h1 css={Styles.PageHeader}>AWS Rekognition</h1>
          <Card>
            {!validEmail ? (
              <CheckEmailForm
                onSubmit={this.onCheckEmail}
                submitting={checkEmailRequest.loading}
                validEmail={validEmail}
              />
            ) : (
              <RegisterForm
                onSubmit={this.onSignupUser}
                submitting={signupRequest.loading}
                email={this.state.email}
              />
            )}
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
