import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';
import AsyncImage from '../../ui/async/AsyncImage';

import { getImageSrc } from '../util';
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

class ImageContainer extends Component {
  wrapperRef = null;

  handleWrapperPosition = this.handleWrapperPosition.bind(this);

  state = {
    imageWrapperPosition: generateInitPos(),
    imageContainerPosition: generateInitPos(),
  }

  componentDidMount() {
    // add event listener
    window.addEventListener('resize', this.handleWrapperPosition);

    this.handleWrapperPosition()
  }

  componentWillUnmount() {
    // remove event listener
    window.removeEventListener('resize', this.handleWrapperPosition);
  }

  handleWrapperPosition() {
    const { image: { meta } } = this.props;
    const {
      height: imageHeight,
      width: imageWidth,
      orientation } = meta;

    const wrapperBounding = this.wrapperRef.getBoundingClientRect();

    // (deep) equals check based on string
    if (JSON.stringify(this.state.wrapperBounding)
      !== JSON.stringify(wrapperBounding)) {
        // get wrapper positions
        const imageContainerPosition = {
          x: wrapperBounding.x,
          y: wrapperBounding.y,
          width: wrapperBounding.width,
          height: wrapperBounding.height,
          top: wrapperBounding.top,
          bottom: wrapperBounding.bottom,
        };

        let width, height, ratio;


        if (orientation === 'LANDSCAPE') {
          // simple case, use full wrapper width
          width = imageContainerPosition.width;

          // get height by sticking with the ratio
          ratio = imageWidth / width;
          height = imageHeight / ratio;

          // check if image height fits into viewport by using max width
          if (height > imageContainerPosition.height) {
            height = imageContainerPosition.height;
            ratio = imageHeight / height;
            width = imageWidth / ratio;
          }
        } else {
          // portrait mode full height
          height = imageContainerPosition.height;
          ratio = imageHeight / height;
          width = imageWidth / ratio;

          // check if image width fits into viewport by using max height
          if (width > imageContainerPosition.width) {
            // scale image down to full width
            width = imageContainerPosition.width;
            ratio = imageWidth / width;
            height = imageHeight / ratio;
          }
        }

        // calculate top position (center of container)
        const top = imageContainerPosition.height / 2 - (height / 2);
        const left = imageContainerPosition.width / 2 -(width / 2);

        // define image position
        const imageWrapperPosition = {
          top,
          left,
          width,
          height,
        };

        this.setState({
          imageContainerPosition,
          imageWrapperPosition,
        });
    }
  }

  render() {
    const { imageWrapperPosition } = this.state;
    const { selectedFace, selectedLabel, image } = this.props;
    const { path } = image;

    return (
      <StyledImageContainer
        ref={(el) => {
          if (!el) { return; }
          this.wrapperRef = el;
        }}
        style={{ justifyContent: 'center' }}
        fill
      >
        <StyledImageWrapper pos={imageWrapperPosition}>
          {selectedFace && <StyledSelector pos={selectedFace.position} />}
          {selectedLabel && (
            <Fragment>
              {selectedLabel.instances.map((pos, i) => (
                <StyledSelector
                  key={`label_selector_${i}`}
                  pos={pos}
                />
              ))}
            </Fragment>
          )}
          <StyledAsyncImage
            src={getImageSrc(path)}
            fit="contain"
          />
        </StyledImageWrapper>
      </StyledImageContainer>
    )
  }
}

export default ImageContainer;