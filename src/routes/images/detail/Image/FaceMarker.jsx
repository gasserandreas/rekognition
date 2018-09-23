import React from 'react';
import PropTypes from 'prop-types';

import './FaceMarker.css';

// average pixel size for char
const charSize = 8;
const leftRightPadding = 1.5;

const renderText = (text, showText) => {
  if (!text || !showText) {
    return null;
  }

  const style = {
    width: `${text.length * charSize + 2 * leftRightPadding}px`,
  }

  return (
   <span style={style} className="text">{text}</span>
  );
}

const FaceMarker = ({ position, text, selected, className, showText, onClick }) => {

  const cssClasses = [
    'face-marker',
    selected ? 'selected' : undefined,
    className,
  ].filter(cssClass => cssClass !== undefined);

  const style = {
    ...position
  };

  return (
    <div
      style={style}
      className={cssClasses.join(' ')}
      onClick={onClick}
    >
      {renderText(text, showText)}
    </div>
  );
}

FaceMarker.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string,
  selected: PropTypes.bool,
  className: PropTypes.string,
  showText: PropTypes.bool,
  onClick: PropTypes.func,
};

FaceMarker.defaultProps = {
  text: undefined,
  selected: false,
  className: undefined,
  showText: true,
  onClick: () => ({}),
};

export default FaceMarker;
