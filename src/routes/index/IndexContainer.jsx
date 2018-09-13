import { connect } from 'react-redux';

import { selectIsAuthenticated } from '../../redux/selectors/app';

import IndexView from './IndexView';

const select = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(IndexView);
