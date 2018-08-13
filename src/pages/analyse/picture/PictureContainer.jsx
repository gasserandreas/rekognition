import { connect } from 'react-redux';

import { addImage } from '../../../redux/images';

import PictureView from './PictureView';

const mapStateToProps = (state) => {
  const { images, auth } = state;
  const { accessKey } = auth;
  const { selectedImage, imageById } = images;

  const image = imageById[selectedImage];

  return {
    imageBase: accessKey,
    image,
  };
};

const mapDispatchToProps = ({
  addImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureView);