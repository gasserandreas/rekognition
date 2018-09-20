import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FaceMarker from './FaceMarker';
import ImageComponent from '../../../../components/Image/Image';

import './Image.css';

const initialState = {
  showImage: false, // hide image before 'onLoad' was fired
  landscape: true,
  imageLoaded: false,
};

class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    loadingContent: PropTypes.node,
    faces: PropTypes.arrayOf(PropTypes.shape({})),
    selectedFaceId: PropTypes.string,
    selectFace: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: undefined,
    loadingContent: undefined,
    faces: [],
    selectedFaceId: null,
  }

  state = initialState;

  onImageLoad = this.onImageLoad.bind(this);

  // set image landscape / portrait style classes after load
  onImageLoad(target) {
    const { clientWidth, clientHeight } = target;

    this.setState({
      showImage: true,
      landscape: clientWidth >= clientHeight,
      imageLoaded: true,
    });
  }

  getPosition(value) {
    return `${value * 100}%`;
  }

  renderFaceMarkers() {
    const { faces, selectedFaceId, selectFace } = this.props;

    return faces.map(({ id, name, properties: { boundingBox } }) => {
      const { Height, Width, Left, Top } = boundingBox;

      if (Width * 100 <= 5) {
        return null;
      }

      const position = {
        top: this.getPosition(Top),
        left: this.getPosition(Left),
        width: this.getPosition(Width),
        height: this.getPosition(Height),
      };
      return (
        <FaceMarker
          key={`face_marker_${id}`}
          text={name}
          selected={id === selectedFaceId}
          position={position}
          onClick={() => selectFace(id)}
        />
      );
    });
  }

  render() {
    const { showImage, landscape, imageLoaded } = this.state;
    const { src, className, loadingContent } = this.props;

    const cssClasses = [
      className,
      showImage ? 'show' : 'hide',
      landscape ? 'landscape' : 'portrait',
    ].filter(cssClass => cssClass !== undefined);

    return (
      <div className="image-wrapper">
        {!showImage && loadingContent}
        <ImageComponent
          className={cssClasses.join(' ')}
          href={src}
          onLoad={this.onImageLoad}
        />
        {imageLoaded && this.renderFaceMarkers()}
      </div>
    );
  }
}

export default Image;