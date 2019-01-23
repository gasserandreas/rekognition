import { connect } from 'react-redux';

import { signupUser, checkEmail, invalidateEmail } from '../../redux/auth';
import {
  isAuthenticatedSelector,
  signUpRequestSelector,
  isValidEmailSelector,
  checkEmailRequestSelector,
} from '../../redux/auth/selectors';

import View from './View';

const select = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
  signupRequest: signUpRequestSelector(state),
  validEmail: isValidEmailSelector(state),
  checkEmailRequest: checkEmailRequestSelector(state),
});

const mapDispatchToProps = ({
  signupUser,
  checkEmail,
  invalidateEmail,
});

export default connect(select, mapDispatchToProps)(View);
