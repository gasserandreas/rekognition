import { connect } from 'react-redux';

import { applicationUserSelector } from '../redux/application/selectors';
import { listImages } from '../redux/images';

import ImagesView from './ImagesView';

const select = state => ({
  user: applicationUserSelector(state),
});

const mapDispatchToProps = ({
  listImages,
});

export default connect(select, mapDispatchToProps)(ImagesView);
