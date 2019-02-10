import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  AuthHeader,
  AuthFooter,
} from '../AuthComponents';

import LoginForm from './LoginForm';

import View from '../../ui/View';
import Card from '../../ui/Card';

import * as Paths from '../../paths';
import { HOCRequestPropTypes } from '../../util/PropTypes';
import { Colors } from '../../styles';


const StyledView = styled(View)`
  background-color: ${Colors.ColorsPalette.Background};

  .content {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 3rem 0;
  }
`;

class LoginView extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loginRequest: HOCRequestPropTypes.isRequired,
  }

  state = {
    loading: false,
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

  render() {
    const { loginRequest: { error, loading }, logInUser } = this.props;
    return (
      <StyledView>
        <AuthHeader>Login to Rekognition</AuthHeader>
        <div className="content">
          <Card pad="large">
            <LoginForm
              user={{ email: '', password: '', remember: false, }}
              onSubmit={logInUser}
              submitting={loading}
              error={error ? error.message : null}
            />
          </Card>
        </div>
        <AuthFooter href={Paths.REGISTER}>Sign up for an account</AuthFooter>
        <AuthFooter href={Paths.PRIVACY}>Privacy note</AuthFooter>
      </StyledView>
    );
  }
}

export default LoginView;
