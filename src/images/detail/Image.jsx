import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';
import AsyncImage from '../../ui/async/AsyncImage';

import { getImageSrc } from '../../util/util';
import { Colors } from '../../styles';

// util
const generateInitPos = () => ({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});

// label / face selector
const StyledSelector = styled.div`
  border: 2px solid ${Colors.ColorsPalette.Brand};
  border-radius: 3px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: ${props => props.pos.top * 100}%;
  left: ${props => props.pos.left * 100}%;
  height: ${props => props.pos.height * 100}%;
  width: ${props => props.pos.width * 100}%;
  z-index: 10;
`;

// image
const StyledAsyncImage = styled(AsyncImage)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`;

// image wrapper
const StyledImageWrapper = styled.div`
  position: absolute;
  top: ${props => props.pos.top}px;
  left: ${props => props.pos.left}px;
  width: ${props => props.pos.width}px;
  height: ${props => props.pos.height}px;
`;

StyledImageWrapper.defaultProps = {
  pos: PropTypes.shape({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }),
};

// image wrapper comp
const StyledImageContainer = styled(Box)``;

const getPositions = (meta, wrapperBounding) => {
  const { height: imageHeight, width: imageWidth, orientation } = meta;

  // get wrapper positions
  const imageContainerPosition = {
    x: wrapperBounding.x,
    y: wrapperBounding.y,
    width: wrapperBounding.width,
    height: wrapperBounding.height,
    top: wrapperBounding.top,
    bottom: wrapperBounding.bottom,
  };

  let width;
  let height;
  let ratio;

  if (orientation === 'LANDSCAPE') {
    // simple case, use full wrapper width
    width = imageContainerPosition.width; // eslint-disable-line prefer-destructuring

    // get height by sticking with the ratio
    ratio = imageWidth / width;
    height = imageHeight / ratio;

    // check if image height fits into viewport by using max width
    if (height > imageContainerPosition.height) {
      height = imageContainerPosition.height; // eslint-disable-line prefer-destructuring
      ratio = imageHeight / height;
      width = imageWidth / ratio;
    }
  } else {
    // portrait mode full height
    height = imageContainerPosition.height; // eslint-disable-line prefer-destructuring
    ratio = imageHeight / height;
    width = imageWidth / ratio;

    // check if image width fits into viewport by using max height
    if (width > imageContainerPosition.width) {
      // scale image down to full width
      width = imageContainerPosition.width; // eslint-disable-line prefer-destructuring
      ratio = imageWidth / width;
      height = imageHeight / ratio;
    }
  }

  // calculate top position (center of container)
  const top = imageContainerPosition.height / 2 - height / 2;
  const left = imageContainerPosition.width / 2 - width / 2;

  // define image position
  const imageWrapperPosition = {
    top,
    left,
    width,
    height,
  };

  return {
    imageContainerPosition,
    imageWrapperPosition,
  };
};

const ImageContainer = ({ image: { meta, path }, selectedFace, selectedLabel }) => {
  const wrapperRef = useRef();
  const [state, setState] = useState({
    imageWrapperPosition: generateInitPos(),
    imageContainerPosition: generateInitPos(),
  });

  useEffect(() => {
    const handleWrapperPosition = () => {
      const wrapperBounding = wrapperRef.current.getBoundingClientRect();

      // (deep) equals check based on string
      if (JSON.stringify(state.wrapperBounding) !== JSON.stringify(wrapperBounding)) {
        const { imageContainerPosition, imageWrapperPosition } = getPositions(meta, wrapperBounding);

        setState({
          imageContainerPosition,
          imageWrapperPosition,
        });
      }
    };

    // add event listener
    window.addEventListener('resize', handleWrapperPosition);

    // calculate wrapper position
    handleWrapperPosition();

    return () => {
      window.removeEventListener('resize', handleWrapperPosition);
    };
  }, [meta, path, state.wrapperBounding]);

  const { imageWrapperPosition } = state;

  return (
    <StyledImageContainer ref={wrapperRef} style={{ justifyContent: 'center' }} fill>
      <StyledImageWrapper pos={imageWrapperPosition}>
        {selectedFace && <StyledSelector id="jestSelectedFace" pos={selectedFace.position} />}
        {selectedLabel && (
          <span id="jestSelectedLabel">
            {selectedLabel.instances.map((pos, i) => (
              <StyledSelector key={`label_selector_${i}`} pos={pos} /> // eslint-disable-line react/no-array-index-key
            ))}
          </span>
        )}
        <StyledAsyncImage
          src={getImageSrc(path)}
          fit="contain"
          wrapperStyles={`
            position: relative;
            display: inline;
          `}
        />
      </StyledImageWrapper>
    </StyledImageContainer>
  );
};

ImageContainer.propTypes = {
  image: PropTypes.shape({
    meta: PropTypes.shape({}),
    path: PropTypes.string.isRequired,
  }).isRequired,
  selectedFace: PropTypes.shape({}),
  selectedLabel: PropTypes.shape({}),
};

ImageContainer.defaultProps = {
  selectedFace: null,
  selectedLabel: null,
};

export const __testables__ = {
  StyledSelector,
  StyledAsyncImage,
  StyledImageWrapper,
  generateInitPos,
  getPositions,
};

export default ImageContainer;
