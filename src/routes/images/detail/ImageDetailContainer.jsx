import { connect } from 'react-redux';

import ImageDetail from './ImageDetail';

import { getUserId } from '../../../common/sessionUtils';
import { getUrl } from '../../../common/services/networkUtils';

import { selectImage } from '../../../redux/images';
import { selectFace } from '../../../redux/faces';

import { selectSelectedImage } from '../../../redux/selectors/images';
import { selectSelectedImageFaces, selectSelectedFaceId } from '../../../redux/selectors/faces';

const select = (state, props) => ({
  imageId: props.match.params.id || null,
  image: selectSelectedImage(state),
  faces: selectSelectedImageFaces(state),
  selectedFaceId: selectSelectedFaceId(state),
  // imageBaseUrl: `${getUrl('image-thumb')}/${getUserId()}/`,
  imageBaseUrl: `${getUrl('image-full')}/${getUserId()}/`,
});

const mapDispatchToProps = ({
  selectImage,
  selectFace,
});

export default connect(select, mapDispatchToProps)(ImageDetail);
