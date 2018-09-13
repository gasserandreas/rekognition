import React from 'react';
import PropTypes from 'prop-types';

import PropertyListItem from './PropertyListItem';

import './PropertyList.css';

const PropertyList = ({ dispatchOnClick, data, excludedKeys }) => {
  if (!data) {
    return <div className="property-list" />;
  }

  return (
    <div
      className="property-list"
      onClick={() => dispatchOnClick && dispatchOnClick(data.id)}
      role="button"
      tabIndex="0"
    >
      <ul>
        { Object.keys(data)
          .filter(key => !excludedKeys.includes(key))
          .map((key, i) => {
            const value = data[key];
            const htmlKey = `propertyItemFor${key}_${i}`;
            return <PropertyListItem key={htmlKey} label={key} data={value} />;
          })
        }
      </ul>
    </div>
  );
};

PropertyList.propTypes = {
  data: PropTypes.shape({}),
  dispatchOnClick: PropTypes.func,
  excludedKeys: PropTypes.arrayOf(PropTypes.string),
};

PropertyList.defaultProps = {
  data: undefined,
  dispatchOnClick: undefined,
  excludedKeys: [],
};

export default PropertyList;