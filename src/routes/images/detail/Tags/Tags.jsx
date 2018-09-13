import React from 'react';
import PropTypes from 'prop-types';

import Badge from '../../../../components/Badge/Badge';
import TagItem from './TagItem';

import './Tags.css';

const renderBadge = (tags) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return <Badge text={tags.length} />
}

const Tags = ({ tags }) => (
  <div className="tags">
    <h3>Tags {renderBadge(tags)}</h3>
    {tags.map((tag, i) =>
      <TagItem key={`analyses_tag_${i}`} tag={tag} />
    )}
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Tags;
