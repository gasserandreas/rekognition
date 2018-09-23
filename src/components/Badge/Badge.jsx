import React from 'react';
import PropTypes from 'prop-types';

import './Badge.css';

const Badge = ({ text }) => {

  return (
    <span className="badge green">{text}</span>
  );
};

Badge.propTypes = {
  text: PropTypes.node.isRequired,
}

export default Badge;
