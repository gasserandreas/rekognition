import React from 'react';
import PropTypes from 'prop-types';

import Badge from '../../../../components/Badge/Badge';
import Face from './Face';

import './Faces.css';

const Faces = ({ faces, selectedFace, onFaceSelect }) => {
  const badge = faces.length > 0 ? <Badge text={faces.length} /> : null;
  return (
    <div className="faces">
        <h3>Faces {badge}</h3>
        {faces.map(face => (
          <Face
            key={`face_${face.id}`}
            face={face}
            onSelect={onFaceSelect}
            selected={selectedFace === face.id}
          />
        ))}
      </div>
  );
};

Faces.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedFace: PropTypes.string,
  onFaceSelect: PropTypes.func.isRequired,
};

Faces.defaultProps = {
  faces: [],
  selectedFace: null,
};

export default Faces;
