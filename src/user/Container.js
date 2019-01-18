import { connect } from 'react-redux';

import { logOutUser } from '../redux/auth';
import { authMetaSelector } from '../redux/auth/selectors';

import { getUserInfo } from '../redux/user';
import { getUserInfoRequestSelector, userSelector } from '../redux/user/selectors';

import UserView from './UserView';

const select = state => ({
  user: userSelector(state),
  getUserInfoRequest: getUserInfoRequestSelector(state),
  authMeta: authMetaSelector(state),
});

const mapDispatchToProps = ({
  logOutUser,
  updateUser: (obj) => {
    console.log('updateUser');
    console.log(obj);
  },
  getUserInfo,
});

export default connect(select, mapDispatchToProps)(UserView);
