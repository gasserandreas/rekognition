import { connect } from 'react-redux';

import { selectNetworkWorking } from '../../../redux/selectors/network';

import AppLoadingBar from './AppLoadingBar';

const select = state => ({
  working: selectNetworkWorking(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(AppLoadingBar);
