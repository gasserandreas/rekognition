import { connect } from 'react-redux';

import { logInUser } from '../../redux/auth';
import {
  isAuthenticatedSelector,
  loginRequestSelector,
} from '../../redux/auth/selectors';

import LoginView from './LoginView';

const select = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
  loginRequest: loginRequestSelector(state),
});

const mapDispatchToProps = ({
  logInUser,
});

export const __testables__ = {
  select,
  mapDispatchToProps,
};

export default connect(select, mapDispatchToProps)(LoginView);
