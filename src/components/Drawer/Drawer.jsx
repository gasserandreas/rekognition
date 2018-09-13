import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image/Image';

import './Drawer.css';

const basePath = '//s3.amazonaws.com/529821714029-rekognition-backend-image-bucket';

const Drawer = ({ open, imageIds, imageById, imageBase, onCloseClick, selectImage }) => {

  return (
    <div className={`drawer ${open ? 'open' : 'close'}`}>
      <div className="drawer-content">
        <a
          onClick={() => onCloseClick()}
          className="close-indicator"
          role="button"
          tabIndex={0}
        ><i className="fal fa-times"></i></a>
        <div>
          <h1>Hello world</h1>
          <ul className="picture-list">
            {imageIds.map((id) => {
              const { name } = imageById[id];
              return (
                <li
                 onClick={() => {
                   selectImage(id);
                   onCloseClick();
                 }}
                 role="button"
                 tabIndex="0"
                 key={`picture_${id}`}
                >
                  <Image
                    src={`${basePath}/${imageBase}/${name}`}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  imageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCloseClick: PropTypes.func,
};

Drawer.defaultProps = {
  onCloseClick: () => ({}),
};

export default Drawer;
