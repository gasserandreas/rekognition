import React from 'react';
import PropTypes from 'prop-types';

const renderItem = (data) => {
  const { value, confidence } = data;
  const rounded = Math.round(100 * confidence) / 100;
  const newValue = typeof value === 'number' ? Math.round(100 * value) / 100 : value;
  return `${newValue} (${rounded}%)`;
};

const renderValue = (data) => {
  // render null or undefined
  if (!data || data === null) {
    return '';
  }

  // render as array list
  if (Array.isArray(data)) {
    const items = data.map((item, i) => {
      const key = `detail_value_${i}`;
      return <li key={key}>{renderItem(item)}</li>;
    });
    return <ul>{items}</ul>;
  }

  // render object
  if (typeof data === 'object') {
    return renderItem(data);
  }

  if (typeof data === 'number') {
    return Math.round(100 * data) / 100;
  }

  // default render string
  return data;
};

const PropertyListItem = (props) => {
  const { label, data } = props;
  return (
    <li className="property-list-item">
      <div className="label">{label}</div>
      <div className="value">{renderValue(data)}</div>
    </li>
  );
};

const customPropTypesObject = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  confidence: PropTypes.number.isRequired,
});

PropertyListItem.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
    PropTypes.arrayOf(customPropTypesObject),
    customPropTypesObject,
  ]),
};

PropertyListItem.defaultProps = {
  data: undefined,
};

export default PropertyListItem;