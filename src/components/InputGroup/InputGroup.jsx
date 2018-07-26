import React from 'react';
import PropTypes from 'prop-types';

import './InputGroup.css';

const InputGroup = (props) => {
  const { htmlFor, labelText, error, children } = props;

  const labelProps = {
    htmlFor,
  };

  return (
    <div className={`input-group ${error.length > 0 ? 'error' : ''}`}>
      {labelText && (
        <label {...labelProps}>{labelText}</label>
      )}
      {children}
      <div className="error-message">{error.map((e, i) => (
        <span key={`error_message_${i}`}>{e}</span>
      ))}</div>
    </div>
  );
};

InputGroup.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  labelText: PropTypes.string,
  error: PropTypes.arrayOf(PropTypes.string),
};

InputGroup.defaultProps = {
  children: undefined,
  htmlFor: undefined,
  labelText: undefined,
  error: [],
};

export default InputGroup;
