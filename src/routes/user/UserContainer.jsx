import { connect } from 'react-redux';

import UserView from './UserView';

import { selectUser } from '../../redux/selectors/app';

import { updateUser, logout } from '../../redux/app';

const select = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = ({
  updateUser,
  logout,
});

export default connect(select, mapDispatchToProps)(UserView);
