import { connect } from 'react-redux';

import { imagesListSelector } from '../redux/images/selectors';

import View from './View';

const select = state => ({
  images: imagesListSelector(state),
});

const mapDispatchToProps = ({});

export default connect(select, mapDispatchToProps)(View);
