import { connect } from 'react-redux';

import { selectIsAuthenticated } from '../redux/auth/selectors';

import View from './View';

const select = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(View);
