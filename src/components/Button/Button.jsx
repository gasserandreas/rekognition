import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
  const newProps = {
    ...props,
    className: `button ${props.color} ${props.className ? props.className : ''}`,
  };

  // remove children
  delete newProps.children;


  return (
    <button {...newProps}>{props.children}</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['default', 'blue', 'green']),
};

Button.defaultProps = {
  color: 'default',
};

export default Button;
