import { connect } from 'react-redux';

import { signupUser, checkEmail, invalidateEmail } from '../../redux/auth';
import {
  isAuthenticatedSelector,
  signUpRequestSelector,
  isValidEmailSelector,
  checkEmailRequestSelector,
} from '../../redux/auth/selectors';

import RegisterView from './RegisterView';

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

export const __testables__ = {
  select,
  mapDispatchToProps,
};

export default connect(select, mapDispatchToProps)(RegisterView);
