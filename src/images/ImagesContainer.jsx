import { connect } from 'react-redux';

import { applicationUserSelector } from '../redux/application/selectors';

import ImagesView from './ImagesView';

const select = state => ({
  user: applicationUserSelector(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(ImagesView);
