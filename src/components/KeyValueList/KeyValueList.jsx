import React from 'react';
import PropTypes from 'prop-types';

import './KeyValueList.css';

const KeyValueList = ({ data, className, onListClick, onListItemClick }) => {

  const listItems = data.map((item, i) => {
    const { key, value} = item;
    const htmlKey = `key_${i}_${key}`;
    return (
      <li key={htmlKey} onClick={(e) => onListItemClick(item, e)}>
        <div className="key">{key}</div>
        <div className="value">{value}</div>
      </li>
    );
  });

  return (
    <ul
      className={`key-value-list ${className ? className : ''}`}
      onClick={onListClick}
    >{listItems}</ul>
  )
};

KeyValueList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.node,
    value: PropTypes.node,
  })).isRequired,
  onListClick: PropTypes.func,
  onListItemClick: PropTypes.func,
};

KeyValueList.defaultProps = {
  className: undefined,
  onListClick: () => ({}),
  onListItemClick: () => ({}),
}

export default KeyValueList;
