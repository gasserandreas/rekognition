import { connect } from 'react-redux';

import { selectFace } from '../../../redux/faces';
import { setSettingShowFaceLabel } from '../../../redux/settings';

import {
  selectImageFaces,
  selectFacesById,
  selectSelectedFaceId,
} from '../../../selectors/faces';

import { selectLabelsForSelectedImage } from '../../../selectors/labels';

import { selectImageIsLoading } from '../../../selectors/images';

import { selectFaceSetting } from '../../../selectors/settings';

import DataView from './DataView';

const select = state => {
  return {
    labels: selectLabelsForSelectedImage(state),
    faceIds: selectImageFaces(state),
    faceById: selectFacesById(state),
    selectedFaceId: selectSelectedFaceId(state),
    loading: selectImageIsLoading(state),
    faceLabelSetting: selectFaceSetting(state),
  };
};

const mapDispatchToProps = ({
  selectFace,
  setSettingShowFaceLabel,
});

export default connect(select, mapDispatchToProps)(DataView);
