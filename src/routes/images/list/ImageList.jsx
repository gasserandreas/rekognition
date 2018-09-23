import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Badge from '../../../components/Badge/Badge';
import ImageItem from './ImageItem/ImageItem';

import * as Paths from '../../../enums/Paths';

import './ImageList.css';

class ImageList extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      imageId: PropTypes.string.isRequired,
    })).isRequired,
    imageBaseUrl: PropTypes.string.isRequired,
  }

  navigateToDetail(id) {
    return () => {
      const url = Paths.GET_IMAGES_DETAILS(id);
      this.props.history.push(url);
    };
  }

  render() {
    const { images, imageBaseUrl } = this.props;

    const badge = images.length > 0 ? <Badge text={images.length} /> : null;

    return (
          <div className="image-list-view">
            <h1 className="title">Your recent analysis {badge}</h1>
            <div className="image-list">
            {images.map((image) => {
              const { imageId, value, created } = image;
              const label = `added: ${moment.unix(created).format('MMM Do YYYY')}`
              return (
                <ImageItem
                  imageId={imageId}
                  key={`image_item_${imageId}`}
                  path={`${imageBaseUrl}${value}`}
                  onClick={this.navigateToDetail(imageId)}
                  label={label}
                />
              );
            })}
          </div>
        </div>
    );
  }
}

export default ImageList;
