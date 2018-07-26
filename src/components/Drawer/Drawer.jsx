import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image/Image';

import './Drawer.css';

const baseUrl = 'http://localhost:3000/img';

const Drawer = ({ open, pictureIds, onCloseClick }) => {

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
            {pictureIds.map((id) => {
              return (
                <li
                 onClick={() => console.log(`selected picture with id ${id}`)}
                 role="button"
                 tabIndex="0"
                 key={`picture_${id}`}
                >
                  <Image src={`${baseUrl}/${id}`} />
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
  pictureIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCloseClick: PropTypes.func,
};

Drawer.defaultProps = {
  onCloseClick: () => ({}),
};

export default Drawer;
