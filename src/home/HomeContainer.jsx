import { connect } from 'react-redux';

import { applicationUserSelector } from '../redux/application/selectors';

// import { loginUser } from '../redux/auth';
import { requestNow, loginUser } from '../redux/playground';

import HomeView from './HomeView';

const select = state => ({
  user: applicationUserSelector(state),
});

const mapDispatchToProps = ({
  loginUser,
  requestNow,
});

export default connect(select, mapDispatchToProps)(HomeView);
