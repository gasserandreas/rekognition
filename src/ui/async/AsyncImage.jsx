import React, { useState, useRef } from 'react';
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

const AsyncImage = ({ onLoad, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  
  const handleOnImageLoad = (image) => {
    setLoaded(true);

    if(onLoad) {
      onLoad(image);
    }
  };

  return (
    <StyledAsyncImage loaded={loaded}>
      { !loaded && <LoadingIndicator /> }
      <Image
        {...props}
        onLoad={() => handleOnImageLoad(imgRef.current)}
        ref={imgRef}
      />
    </StyledAsyncImage>
  )
}

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
