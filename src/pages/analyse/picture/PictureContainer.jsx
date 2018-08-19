import { connect } from 'react-redux';

import { addImage } from '../../../redux/images';

import PictureView from './PictureView';

const mapStateToProps = (state) => {
  const { images, auth } = state;
  const { accessKey } = auth;
  const { selectedImage, byId } = images;

  const image = byId[selectedImage];


  console.log(state);
  
  return {
    imageBase: accessKey,
    image,
  };
};

const mapDispatchToProps = ({
  addImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureView);