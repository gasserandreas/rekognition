import { connect } from 'react-redux';

import { applicationUserSelector } from '../redux/application/selectors';

import UserView from './UserView';

const select = state => ({
  user: applicationUserSelector(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(UserView);
