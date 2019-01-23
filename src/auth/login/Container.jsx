import { connect } from 'react-redux';

import { logInUser } from '../../redux/auth';
import {
  isAuthenticatedSelector,
  loginRequestSelector,
} from '../../redux/auth/selectors';

import View from './View';

const select = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
  loginRequest: loginRequestSelector(state),
});

const mapDispatchToProps = ({
  logInUser,
});

export default connect(select, mapDispatchToProps)(View);
