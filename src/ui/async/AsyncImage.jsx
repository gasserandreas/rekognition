import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Image } from 'grommet';

import LoadingIndicator from './LoadingIndicator';

const StyledAsyncImage = styled(Box)`
  justify-content: center;
  transition: all 0.5s ease;
  img {
    opacity ${props => props.loaded ? '1' : '0'};
    display: ${props => props.loaded ? 'flex' : 'none'};
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

    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    const { ...props } = this.props;
    return (
      <StyledAsyncImage loaded={loaded} {...props}>
        { !loaded && <LoadingIndicator /> }
        <Image
          onLoad={() => this.onImageLoad(this.imgRef)}
          ref={(tag) => this.imgRef = tag ? tag : null }
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
