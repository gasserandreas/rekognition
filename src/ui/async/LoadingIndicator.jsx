import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Colors } from '../../styles';


const StyledLoadingIndicator = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${props => props.size}px;
  &:before {
    content: '';
    display: block;
  }

  circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  
  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    // animation: dash 1.5s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes color {
    100%,
    0% {
      // stroke: #d62d20;
      stroke: ${Colors.Blue.Default}
    }
    40% {
      // stroke: #0057e7;
      stroke: ${Colors.Blue.Light}
    }
    66% {
      // stroke: #008744;
      stroke: ${Colors.Blue.Default}
    }
    80%,
    90% {
      // stroke: #ffa700;
      stroke: ${Colors.Blue.Dark}
    }
  }
  
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
`;

const LoadingIndicator = (props) => (
  <StyledLoadingIndicator {...props}>
    <svg
      className="circular"
      viewBox="25 25 50 50"
    >
      <circle
        className="path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  </StyledLoadingIndicator>
);

LoadingIndicator.propTypes = {
  size: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  size: 100,
};

export default LoadingIndicator;
