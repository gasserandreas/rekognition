import { connect } from 'react-redux';

import { logInUser } from '../redux/auth';
import {
  selectIsAuthenticated,
  selectLoginRequest,
} from '../redux/auth/selectors';

import View from './View';

const select = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  loginRequest: selectLoginRequest(state),
});

const mapDispatchToProps = ({
  logInUser,
});

export default connect(select, mapDispatchToProps)(View);
