import React from 'react';
import PropTypes from 'prop-types';

import Image from '../../../../components/Image/Image';

import './ImageItem.css';

const ImageItem = ({ imageId, path, content, onClick, label }) => {
  return (
    <div className="image-item">
      <Image
        key={`image_item_${imageId}`}
        href={path}
        onClick={onClick}
        withDiv
      />
      { label && <span className="label">{label}</span>}
    </div>
  );
};

ImageItem.propTypes = {
  path: PropTypes.string,
  content: PropTypes.string,
  onClick: PropTypes.func,
};

ImageItem.defaultProps = {
  path: undefined,
  content: undefined,
  onClick: () => ({}),
};

export default ImageItem;
