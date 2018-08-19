import { connect } from 'react-redux';

import { selectImageFaces, selectFacesById } from '../../../selectors/faces';
import { selectLabelsForSelectedImage } from '../../../selectors/labels';

import DataView from './DataView';

const selectFace = faceId => (dispatch) => {
  console.log('selectFace');
  console.log(faceId);
}

const select = state => {
  return {
    labels: selectLabelsForSelectedImage(state),
    faceIds: selectImageFaces(state),
    faceById: selectFacesById(state),
  };
};

const mapDispatchToProps = ({
  selectFace,
});

export default connect(select, mapDispatchToProps)(DataView);
