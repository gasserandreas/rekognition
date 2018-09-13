import { connect } from 'react-redux';

import { login } from '../../redux/app';

import { selectUser } from '../../redux/selectors/app';

import LoginView from './LoginView';

const select = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = ({
  login,
});

export default connect(select, mapDispatchToProps)(LoginView);
