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
      {text && (<label>{text}</label>)}
    </div>
  );
};

FaceMarker.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  zIndex: PropTypes.number,
};

FaceMarker.defaultProps = {
  text: undefined,
  className: undefined,
  zIndex: 0,
  onClick: () => ({}),
};

export default FaceMarker;
