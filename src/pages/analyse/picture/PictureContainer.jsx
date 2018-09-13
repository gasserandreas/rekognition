import { connect } from 'react-redux';

import { addImage } from '../../../redux/images';
import { selectFace } from '../../../redux/faces';

import {
  selectFacesById,
  selectImageFaces,
  selectSelectedFaceId,
} from '../../../selectors/faces';

import {
  selectSelectedImage,
  selectImageIsLoading,
} from '../../../selectors/images';

import { selectAuthKey } from '../../../selectors/auth';

import { selectFaceSetting } from '../../../selectors/settings';

import PictureView from './PictureView';

const select = state => ({
  imageBase: selectAuthKey(state),
  image: selectSelectedImage(state),
  faceIds: selectImageFaces(state),
  facesById: selectFacesById(state),
  selectedFace: selectSelectedFaceId(state),
  loading: selectImageIsLoading(state),
  faceLabelSetting: selectFaceSetting(state),
});

const mapDispatchToProps = ({
  addImage,
  selectFace,
});

export default connect(select, mapDispatchToProps)(PictureView);