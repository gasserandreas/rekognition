import React from 'react';
import PropTypes from 'prop-types';

import './Drawer.css';

const Drawer = ({ open, children, onCloseClick }) => {

  return (
    <div className={`drawer ${open ? 'open' : 'close'}`}>
      <div className="drawer-content">
        <a
          onClick={() => onCloseClick()}
          className="close-indicator"
          role="button"
          tabIndex={0}
        ><i className="fal fa-times"></i></a>
        {children}
      </div>
    </div>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onCloseClick: PropTypes.func,
};

Drawer.defaultProps = {
  onCloseClick: () => ({}),
};

export default Drawer;
