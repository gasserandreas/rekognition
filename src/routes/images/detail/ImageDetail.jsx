import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Tags from './Tags/Tags';
import Faces from './Faces/Faces';
import Image from './Image/Image';

import * as Paths from '../../../enums/Paths';

import './ImageDetail.css';

class ImageDetail extends Component {

  static propTypes = {
    imageId: PropTypes.string,
    image: PropTypes.shape({}),
    faces: PropTypes.arrayOf(PropTypes.shape({})),
    selectedFaceId: PropTypes.string,
    imageBaseUrl: PropTypes.string.isRequired,
    selectImage: PropTypes.func.isRequired,
    selectFace: PropTypes.func.isRequired,
  }

  static defaultProps = {
    image: null,
    imageId: null,
    faces: [],
    selectedFaceId: null,
  }

  componentWillMount() {
    const { match, history, selectImage } = this.props;
    const { id } = match.params;

    if (!id) {
      history.push(Paths.IMAGES);
      return;
    }

    selectImage(id);
  }

  renderAnalyseContent() {
    const { image, faces, selectedFaceId, selectFace } = this.props;
    return (
      <div className="analysis-content">
        {/* {this.renderSettings()} */}
        <Tags tags={image.labels} />
        <Faces
          faces={faces}
          onFaceSelect={selectFace}
          selectedFace={selectedFaceId}
        />
      </div>
    );
  }

  renderNoInformation() {
    return (
      <div className="loading-content">
        <h3>Fetching your image information right now, please wait.</h3>
      </div>
    )
  }

  renderImageLoadingContent() {
    return (
      <div className="loading-image">
        <h3>Your image is getting loaded, please wait.</h3>
      </div>
    )
  }
  render() {
    const { image, imageBaseUrl, faces, selectedFaceId, selectFace } = this.props;
    const validImage = image !== null;

    return (
      <div className="image-detail">
        <section className="image-container">
        {validImage && (
            <Image
              src={`${imageBaseUrl}${image.value}`}
              loadingContent={this.renderImageLoadingContent()}
              faces={faces}
              selectFace={selectFace}
              selectedFaceId={selectedFaceId}
            />
          )}
        </section>
        <section className="analysis-container">
          {validImage ? this.renderAnalyseContent() : this.renderNoInformation()}
        </section>
        <Link to={Paths.IMAGES} className="back-link"><i className="fas fa-chevron-left" /> Go back</Link>
      </div>
    )
  }
}

export default ImageDetail;
