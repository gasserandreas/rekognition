import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AuthHeader, AuthFooter } from '../AuthComponents';

import CheckEmailForm from './CheckEmailForm';
import RegisterForm from './RegisterForm';

import Card from '../../ui/Card';
import View from '../../ui/View';
import { createUseIsAuthenticatedHistoryPush } from '../../ui/hooks/auth';

import * as Paths from '../../paths';
import { HOCRequestPropTypes, HistoryPropType } from '../../util/PropTypes';
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

const RegisterView = ({
  signupRequest,
  checkEmailRequest,
  validEmail,
  isAuthenticated,
  history,
  signupUser,
  checkEmail,
  invalidateEmail,
}) => {
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  // check is auth
  useIsAuthenticatedHistoryPush(isAuthenticated, history);

  // handle check email
  const onCheckEmail = (attr) => {
    setEmail(attr.email);
    checkEmail(attr.email);
  };

  // handle cancel
  const onCancelSignUp = () => {
    invalidateEmail();
  };

  return (
    <StyledView>
      <AuthHeader>Sinup for Rekognition</AuthHeader>
      <div className="content">
        <Card pad="large">
          {!validEmail ? (
            <CheckEmailForm
              user={{ email }}
              onSubmit={onCheckEmail}
              submitting={checkEmailRequest.loading}
              error={checkEmailRequest.error ? checkEmailRequest.error.message : null}
              validEmail={validEmail}
            />
          ) : (
            <RegisterForm
              user={{
                email, password: '', firstname: '', lastname: '', remember: false,
              }}
              onSubmit={signupUser}
              onCancel={onCancelSignUp}
              submitting={signupRequest.loading}
              error={signupRequest.error ? signupRequest.error.message : null}
            />
          )}
        </Card>
      </div>
      <AuthFooter href={Paths.LOGIN}>Use login credentials instead</AuthFooter>
      <AuthFooter href={Paths.PRIVACY}>Privacy note</AuthFooter>
    </StyledView>
  );
};

RegisterView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signupRequest: HOCRequestPropTypes.isRequired,
  checkEmailRequest: HOCRequestPropTypes.isRequired,
  history: HistoryPropType.isRequired,
  validEmail: PropTypes.bool,
  signupUser: PropTypes.func.isRequired,
  checkEmail: PropTypes.func.isRequired,
  invalidateEmail: PropTypes.func.isRequired,
};

RegisterView.defaultProps = {
  validEmail: null,
};

export default RegisterView;
