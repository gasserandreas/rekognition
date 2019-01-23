import { connect } from 'react-redux';

import { logOutUser } from '../redux/auth';
import { authMetaSelector } from '../redux/auth/selectors';

import { getUserInfo, updateUser } from '../redux/user';
import { getUserInfoRequestSelector, updateUserRequestSelector, userSelector } from '../redux/user/selectors';

import UserView from './UserView';

const select = state => ({
  user: userSelector(state),
  getUserInfoRequest: getUserInfoRequestSelector(state),
  updateUserRequest: updateUserRequestSelector(state),
  authMeta: authMetaSelector(state),
});

const mapDispatchToProps = ({
  logOutUser,
  updateUser,
  getUserInfo,
});

export default connect(select, mapDispatchToProps)(UserView);
