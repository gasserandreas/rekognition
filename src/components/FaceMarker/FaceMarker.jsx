import React from 'react';
import PropTypes from 'prop-types';

import './FaceMarker.css';

const FaceMarker = (props) => {
  const {
    id,
    text,
    className,
    x,
    y,
    width,
    height,
    onClick,
    zIndex,
    showLabel,
  } = props;

  const customClassName = `face-marker ${className ? className : ''}`;

  const style = {
    top: x,
    left: y,
    width,
    height,
    zIndex,
  };

  return (
    <div
      style={style}
      className={customClassName}
      onClick={() => onClick(id)}
    >
      {showLabel && text && <label >{text}</label>}
    </div>
  );
};

FaceMarker.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  zIndex: PropTypes.number,
  showLabel: PropTypes.bool,
};

FaceMarker.defaultProps = {
  text: undefined,
  className: undefined,
  zIndex: 0,
  showLabel: true,
  onClick: () => ({}),
};

export default FaceMarker;
