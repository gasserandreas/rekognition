import React from 'react';
import PropTypes from 'prop-types';

import PropertyList from '../../../../components/PropertyList/PropertyList';

import './Face.css';

const Face = ({ face, onSelect, selected }) => {
  const { id, properties, name } = face;

  const cssClasses = [
    'face',
    selected ? 'selected' : null,
  ].filter(cssClass => cssClass !== undefined);

  return (
    <div key={`face_${id}`} className={cssClasses.join(' ')}>
      <label>{name}</label>
      <PropertyList
        data={properties}
        dispatchOnClick={() => onSelect(id)}
        excludedKeys={['pose', 'landmarks', 'boundingBox']}
      />
    </div>
  );
}

Face.propTypes = {
  face: PropTypes.shape({
    id: PropTypes.string.isRequired,
    properties: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      PropTypes.shape({}).isRequired,
    ]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Face.defaultProps = {
  selected: false,
};

export default Face;