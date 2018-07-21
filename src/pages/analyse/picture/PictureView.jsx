import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../components/Image/Image';

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
    console.log(this.state.dimension);
    const { dimension } = this.state;
    const { width, height } = dimension;

    const className = width > height ? 'max-width' : 'max-height';

    return (
      <div className="picture-view">
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
