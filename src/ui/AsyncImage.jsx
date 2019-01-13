import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Image } from 'grommet';

import LoadingIndicator from './LoadingIndicator';

const StyledAsyncImage = styled(Box)`
  img {
    opacity ${props => props.loaded ? '0' : '1'};
  }
`;

class AsyncImage extends Component {
  state = {
    loaded: false,
  }

  onImageLoad = this.onImageLoad.bind(this);

  onImageLoad(image) {
    const { onLoad } = this.props;
    if(onLoad ) {
      onLoad(image);
    }

    // disable loading indicator
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const { ...props } = this.props;
    return (
      <StyledAsyncImage>
        { !loaded && <LoadingIndicator /> }
        <Image
          onLoad={() => this.onImageLoad(this.imgRef)}
          ref={(tag) => this.imgRef = tag ? tag : null }
          loaded={loaded}
          {...props}
        />
      </StyledAsyncImage>
    );
  }
};

AsyncImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AsyncImage;
