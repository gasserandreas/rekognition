import { connect } from 'react-redux';

import { applicationUserSelector } from '../redux/application/selectors';

import { logInUser, logOutUser } from '../redux/auth';
import { requestNow, getUserInfo } from '../redux/playground';

import HomeView from './HomeView';

const select = state => ({
  user: applicationUserSelector(state),
});

const mapDispatchToProps = ({
  logInUser,
  logOutUser,
  requestNow,
  getUserInfo
});

export default connect(select, mapDispatchToProps)(HomeView);
