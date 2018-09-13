import React from 'react';
import ReactToggle from 'react-toggle';

import './ReactToggle.css';
import './Toggle.css';

export default props => {
  const newProps = { text: undefined, ...props };
  return (
    <label className="custom-toggle">
      <ReactToggle {...newProps} />
      {props.text && <span>{props.text}</span>}
    </label>
  );
};