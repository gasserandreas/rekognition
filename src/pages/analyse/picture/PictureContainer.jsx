import { connect } from 'react-redux';

import PictureView from './PictureView';

const mapStateToProps = (state) => {

  return {
    imageId: 'picture_2.jpg',
  };
};

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PictureView);