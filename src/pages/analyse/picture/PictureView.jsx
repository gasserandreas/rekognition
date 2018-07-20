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
        width: naturalWidth > naturalHeight ? '100%' : 'auto',
        height: naturalWidth > naturalHeight ? 'auto%' : '100%',
      }
    })
  }

  render() {
    console.log(this.state.dimension);
    return (
      <div className="picture-view">
        <div className="image-wrapper">
          <Image
            src={`${basePath}${this.props.imageId}`}
            alt=""
            onLoad={this.onImgLoad}
          />
        </div>
      </div>
    );
  }
}

export default PictureView;
