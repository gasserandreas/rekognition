import React from 'react';
import PropTypes from 'prop-types';

import './TagItem.css';

const TagItem = ({ tag }) => {
    const { key } = tag;
    const value = `${Math.round(100 * tag.value) / 100}%`;
    return <span className="tag">{key} ({value})</span>;
};

TagItem.propTypes = {
  tag: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};

export default TagItem;
