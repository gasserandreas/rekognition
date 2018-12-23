import { connect } from 'react-redux';

import { signupUser } from '../redux/auth';
import {
  selectIsAuthenticated,
  selectSignUpRequest,
} from '../redux/auth/selectors';

import View from './View';

const select = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  signupRequest: selectSignUpRequest(state),
});

const mapDispatchToProps = ({
  signupUser,
});

export default connect(select, mapDispatchToProps)(View);
