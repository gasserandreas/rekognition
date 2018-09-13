import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = (props) => {
  const { className, color, filled } = props;

  const cssClasses = [
    'button',
    className || undefined,
    color,
    filled ? 'filled' : undefined,
  ].filter(item => item !== undefined);

  const newProps = {
    type: 'button',
    tabIndex: 0,
    ...props,
    className: cssClasses.join(' '),
  };

  return (
    <button {...newProps}/>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['warning', 'default']),
  filled: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  color: 'default',
  filled: false,
};

export default Button;
