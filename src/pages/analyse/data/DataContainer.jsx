import { connect } from 'react-redux';

import { selectFace } from '../../../redux/faces';

import {
  selectImageFaces,
  selectFacesById,
  selectSelectedFaceId,
} from '../../../selectors/faces';
import { selectLabelsForSelectedImage } from '../../../selectors/labels';

import DataView from './DataView';

const select = state => {
  return {
    labels: selectLabelsForSelectedImage(state),
    faceIds: selectImageFaces(state),
    faceById: selectFacesById(state),
    selectedFaceId: selectSelectedFaceId(state), 
  };
};

const mapDispatchToProps = ({
  selectFace,
});

export default connect(select, mapDispatchToProps)(DataView);