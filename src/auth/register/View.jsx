import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  AuthHeader,
  AuthFooter,
} from '../AuthComponents';

import CheckEmailForm from './CheckEmailForm';
import RegisterForm from './RegisterForm';

import Card from '../../ui/Card';

import * as Paths from '../../paths';
import { HOCRequestPropTypes } from '../../util/PropTypes';
import { Colors } from '../../styles';


const StyledView = styled.div`
  background-color: ${Colors.ColorsPalette.Background};
  min-height: 100vh;

  .content {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 3rem 0;
  }
`;

class View extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signupRequest: HOCRequestPropTypes.isRequired,
    validEmail: PropTypes.bool,
    signupUser: PropTypes.func.isRequired,
    checkEmail: PropTypes.func.isRequired,
    invalidateEmail: PropTypes.func.isRequired,
  }

  static defaultProps = {
    validEmail: null,
  };

  onCheckEmail = this.onCheckEmail.bind(this);
  onCancelSignUp = this.onCancelSignUp.bind(this);

  state = {
    loading: false,
    email: '',
  }


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
      }, 300);
    }
  }

  onCheckEmail({ email }) {
    this.setState({ email });
    this.props.checkEmail(email);
  }

  onCancelSignUp() {
    // cancel valid email
    this.props.invalidateEmail();
  }

  render() {
    const {
      signupRequest,
      checkEmailRequest,
      validEmail,
      signupUser,
    } = this.props;

    const { email } = this.state;

    return (
      <StyledView>
        <AuthHeader>Sinup for Rekognition</AuthHeader>
        <div className="content">
          <Card pad="large">
            { !validEmail ? (
              <CheckEmailForm
                user={{ email: '' }}
                onSubmit={this.onCheckEmail}
                submitting={checkEmailRequest.loading}
                error={checkEmailRequest.error ? checkEmailRequest.error.message : null}
                validEmail={validEmail}
              />
            ) : (
              <RegisterForm
                user={{ email, password: '', firstname: '', lastname: '', remember: false }}
                onSubmit={signupUser}
                onCancel={this.onCancelSignUp}
                submitting={signupRequest.loading}
                error={signupRequest.error ? signupRequest.error.message : null}
              />
            )}
          </Card>
        </div>
        <AuthFooter href={Paths.LOGIN}>Use login credentials instead</AuthFooter>
      </StyledView>
    );
  }
}

export default View;
