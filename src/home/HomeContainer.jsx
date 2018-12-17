import { connect } from 'react-redux';

import { applicationUserSelector } from '../redux/application/selectors';

import HomeView from './HomeView';

const select = state => ({
  user: applicationUserSelector(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(HomeView);
