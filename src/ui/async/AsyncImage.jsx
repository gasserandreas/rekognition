import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Image } from 'grommet';

import LoadingIndicator from './LoadingIndicator';

export const StyledAsyncImage = styled(Box)`
  justify-content: center;
  transition: all 0.5s ease;
  ${props => props.wrapperStyles || ''}
  img {
    opacity: ${props => (props.loaded ? '1' : '0')};
    display: ${props => (props.loaded || props.neverHideImg ? 'flex' : 'none')};
  }
`;

const AsyncImage = ({ onLoad, wrapperStyles, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnImageLoad = (e) => {
    setLoaded(true);

    if (onLoad) {
      const { target } = e;
      onLoad(target);
    }
  };

  return (
    <StyledAsyncImage wrapperStyles={wrapperStyles} loaded={loaded}>
      {!loaded && <LoadingIndicator />}
      <Image {...props} onLoad={handleOnImageLoad} />
    </StyledAsyncImage>
  );
};

AsyncImage.propTypes = {
  src: PropTypes.string.isRequired,
  neverHideImg: PropTypes.bool,
  onLoad: PropTypes.func,
  wrapperStyles: PropTypes.string,
};

AsyncImage.defaultProps = {
  neverHideImg: false,
  onLoad: null,
  wrapperStyles: null,
};

export default AsyncImage;
