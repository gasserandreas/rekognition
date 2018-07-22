import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../components/Image/Image';
import FaceMarker from '../../../components/FaceMarker/FaceMarker';

import './PictureView.css';

const basePath = '//localhost:3000/img/';

const initialState = {
  dimension: {
    width: 0,
    height: 0,
  },
};

class PictureView extends Component {
  state = initialState;

  onImgLoad = this.onImgLoad.bind(this);

  static propTypes = {
    imagePath: PropTypes.string,
  };
  
  static defaultProps = {
    imagePath: undefined,
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

  render() {
    const { dimension } = this.state;
    const { width, height } = dimension;

    const className = width > height ? 'max-width' : 'max-height';

    return (
      <div className="picture-view">
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
          src={`${basePath}${this.props.imageId}`}
          alt=""
          onLoad={this.onImgLoad}
          className={className}
        />
      </div>
    );
  }
}

export default PictureView;
