import { connect } from 'react-redux';

import DataView from './DataView';

// dummy
const tags = [];
for(let i=0; i < 12; i++) {
  tags.push({ key: `key ${i}`, value: `value ${i}`});
}

const faceIds = ['eab1d8d4-2618-4f50-8df0-c25d56459401', 'ce729ce4-05b3-4552-9766-bffd165ad73b'];

const faceById = {
  'eab1d8d4-2618-4f50-8df0-c25d56459401': {
    id: 'eab1d8d4-2618-4f50-8df0-c25d56459401',
    tags,
  },
  'ce729ce4-05b3-4552-9766-bffd165ad73b': {
    id: 'ce729ce4-05b3-4552-9766-bffd165ad73b',
    tags,
  },
};

const selectFace = faceId => (dispatch) => {
  console.log('selectFace');
  console.log(faceId);
}

const mapStateToProps = (state) => {

  return {
    tags,
    faceIds,
    faceById,
  };
};

const mapDispatchToProps = ({
  selectFace,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataView);
