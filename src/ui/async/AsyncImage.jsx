import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Image } from 'grommet';

import LoadingIndicator from './LoadingIndicator';

export const StyledAsyncImage = styled(Box)`
  justify-content: center;
  transition: all 0.5s ease;
  img {
    opacity: ${props => props.loaded ? '1' : '0'};
    display: ${props => props.loaded || props.neverHideImg ? 'flex' : 'none'};
  }
`;

class AsyncImage extends Component {
  state = {
    loaded: false,
  }

  onImageLoad = this.onImageLoad.bind(this);

  onImageLoad(image) {
    const { onLoad } = this.props;

    this.setState({ loaded: true });

    if(onLoad ) {
      onLoad(image);
    }
  }

  render() {
    const { loaded } = this.state;
    const { ...props } = this.props;
    return (
      <StyledAsyncImage loaded={loaded} {...props}>
        { !loaded && <LoadingIndicator /> }
        <Image
          {...props}
          onLoad={() => this.onImageLoad(this.imgRef)}
          ref={(tag) => this.imgRef = tag ? tag : null }
        />
      </StyledAsyncImage>
    );
  }
};

AsyncImage.propTypes = {
  src: PropTypes.string.isRequired,
  neverHideImg: PropTypes.bool,
  onLoad: PropTypes.func,
};

AsyncImage.defaultProps = {
  neverHideImg: false,
  onLoad: null,
};

export default AsyncImage;
