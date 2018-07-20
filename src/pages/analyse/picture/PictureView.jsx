import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../components/Image/Image';

import './PictureView.css';

class PictureView extends Component {
  static propTypes = {
    imagePath: PropTypes.string,
  };
  
  static defaultProps = {
    imagePath: undefined,
  };

  render() {
    return (
      <div className="picture-view">
        <div className="image-wrapper">
          <Image href={this.props.imagePath} />
        </div>
      </div>
    );
  }
}

export default PictureView;
