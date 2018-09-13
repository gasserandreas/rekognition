import { connect } from 'react-redux';

import RegisterView from './RegisterView';

import { register } from '../../redux/app';

import { selectUser } from '../../redux/selectors/app';

const select = state => ({
  user: selectUser(state),
});

const mapDispatchToProps = ({
  register,
});

export default connect(select, mapDispatchToProps)(RegisterView);
