import React from 'react';
import PropTypes from 'prop-types';

import './Badge.css';

const Badge = ({ text, bgColor }) => {

  const styles = {
    backgroundColor: bgColor,
  };

  return (
    <div style={styles} className="badge">{text}</div>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};

Badge.defaultProps = {
  bgColor: '#ccc',
};

export default Badge;
