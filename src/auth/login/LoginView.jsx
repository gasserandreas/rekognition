import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AuthHeader, AuthFooter } from '../AuthComponents';

import LoginForm from './LoginForm';

import View from '../../ui/View';
import Card from '../../ui/Card';
import { createUseIsAuthenticatedHistoryPush } from '../../ui/hooks/auth';

import * as Paths from '../../paths';
import { HOCRequestPropTypes } from '../../util/PropTypes';
import { Colors } from '../../styles';

// creat hook
const useIsAuthenticatedHistoryPush = createUseIsAuthenticatedHistoryPush(Paths.HOME);

const StyledView = styled(View)`
  background-color: ${Colors.ColorsPalette.Background};

  .content {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 3rem 0;
  }
`;

const LoginView = ({
  loginRequest: { error, loading }, logInUser, isAuthenticated, history,
}) => {
  // handle auth check
  useIsAuthenticatedHistoryPush(isAuthenticated, history);

  return (
    <StyledView>
      <AuthHeader>Login to Rekognition</AuthHeader>
      <div className="content">
        <Card pad="large">
          <LoginForm
            user={{ email: '', password: '', remember: false }}
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
};

LoginView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginRequest: HOCRequestPropTypes.isRequired,
};

export default LoginView;
