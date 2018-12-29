import { connect } from 'react-redux';

import { signupUser, checkEmail } from '../redux/auth';
import {
  selectIsAuthenticated,
  selectSignUpRequest,
  selectValidEmail,
  selectCheckEmailRequest,
} from '../redux/auth/selectors';

import View from './View';

const select = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  signupRequest: selectSignUpRequest(state),
  validEmail: selectValidEmail(state),
  checkEmailRequest: selectCheckEmailRequest(state),
});

const mapDispatchToProps = ({
  signupUser,
  checkEmail,
});

export default connect(select, mapDispatchToProps)(View);
