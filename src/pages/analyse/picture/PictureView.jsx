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
  onDropFiles = this.onDropFiles.bind(this);

  static propTypes = {
    image: PropTypes.shape({}),
    imageBase: PropTypes.string.isRequired,
    faceIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    facesById: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    selectedFace: PropTypes.string,
    addImage: PropTypes.func.isRequired,
    selectFace: PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    image: undefined,
    selectedFace: undefined,
  };

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

  renderFaces() {
    const { faceIds, facesById, selectedFace, selectFace } = this.props;

    const faces = faceIds.map((id, i) => {
      const { name, properties } = facesById[id];

      // calculate sizes / position
      const { boundingBox } = properties;
      const { Height, Width, Left, Top } = boundingBox;

      return (
        <FaceMarker
          key={`face_marker_${id}`}
          id={id}
          y={`${Left * 100}%`}
          x={`${Top * 100}%`}
          width={`${Width * 100}%`}
          height={`${Height * 100}%`}
          text={name}
          onClick={selectFace}
          zIndex={(faceIds.length - i) + 10}
          className={selectedFace === id ? 'selected' : ''}
        />
      );
    });

    return (
      <Fragment>
        {faces}
      </Fragment>
    );
  }

  renderImage() {
    const { dimension } = this.state;
    const { width, height } = dimension;

    const {image, imageBase } = this.props;
    const { name } = image;
    const className = width < height ? 'max-height' : 'max-width';

    return (
      <Fragment>
        {this.renderFaces()}
        <Image
          src={`${basePath}/${imageBase}/${name}`}
          alt=""
          onLoad={this.onImgLoad}
          className={className}
        />
      </Fragment>
    )
  }

  renderImageContent() {
    const { loading, image } = this.props;

    if (loading) {
      return <p>Loading</p>;
    }

    return (image) ? this.renderImage() : this.renderDropzone();
  }

  render() {
    const { dimension } = this.state;
    const { width, height } = dimension;

    const styles = {};
    if (width < height) {
      styles.width = 'inherit';
    } else {
      styles.height = 'inherit';
    }

    return (
      <div
        style={styles}
        className="picture-view"
      >
        {this.renderImageContent()}
      </div>
    );
  }
}

export default PictureView;
