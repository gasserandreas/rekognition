import { connect } from 'react-redux';

import { postImage } from '../../../redux/images';

import UploadButton from './UploadButton';

const select = state => ({});

const mapDispatchToProps = ({
  postImage,
});

export default connect(select, mapDispatchToProps)(UploadButton);
