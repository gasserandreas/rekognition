import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Image from '../../../components/Image/Image';
import FaceMarker from '../../../components/FaceMarker/FaceMarker';

import './PictureView.css';

const basePath = '//s3.amazonaws.com/529821714029-rekognition-backend-image-bucket';

const initialState = {
  dimension: {
    width: 0,
    height: 0,
  },
};

class PictureView extends Component {
  state = initialState;

  onImgLoad = this.onImgLoad.bind(this);
  onFaceClick = this.onFaceClick.bind(this);
  onDropFiles = this.onDropFiles.bind(this);

  static propTypes = {
    image: PropTypes.shape({}),
    imageBase: PropTypes.string.isRequired,
  };
  
  static defaultProps = {
    image: undefined,
  };

  onFaceClick(face) {
    console.log('onFaceClick');
    console.log(face);
  }

  onImgLoad({ target: img }) {
    const { naturalWidth, naturalHeight } = img;
    this.setState({
      dimension: {
        width: naturalWidth,
        height: naturalHeight,
      }
    })
  }

  onDropFiles(files) {
    if (files.length === 1) {
      this.props.addImage(files[0]);
    }
  }

  renderDropzone() {
    return (
      <Dropzone
        // ref={(el) => { this.dropZoneRef = el; }}
        onDrop={this.onDropFiles}
        className="dropzone"
        multiple={false}
      >
        <div className="dropzoneLabel">Add image</div>
      </Dropzone>
    );
  }

  renderImage() {
    const { dimension } = this.state;
    const { width, height } = dimension;

    const { image, imageBase } = this.props;
    const { id: imageId, name } = image;
    const className = width > height ? 'max-width' : 'max-height';

    return (
      <Fragment>
        <FaceMarker
          id="1234"
          className="face-1"
          x={162}
          y={100}
          width={116}
          height={135}
          text="Face 1"
          onClick={this.onFaceClick}
        />
        <Image
          src={`${basePath}/${imageBase}/${name}`}
          alt=""
          onLoad={this.onImgLoad}
          className={className}
        />
      </Fragment>
    )
  }

  render() {
    const { image } = this.props
    return (
      <div className="picture-view">
        { image ? this.renderImage() : this.renderDropzone()}
      </div>
    );
  }
}

export default PictureView;
