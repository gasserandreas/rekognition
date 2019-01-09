import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors } from '../../styles';

const StyledAttrLabel = styled.label`
  font-weight: 600;
  flex-shrink: 0;
  flex-grow: 0;
  width: 10rem;
  margin-right: 0.5rem;
`;

const StyledAttrContent = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
`;

const StyledAttr = styled(Box)`
  
`;

const Attribute = ({
  name,
  confidence,
  value,
  showConfidence,
}) => (
  <StyledAttr
    fill
    direction="row"
    alignContent="between"
  >
    <StyledAttrLabel>{name}</StyledAttrLabel>
    <StyledAttrContent>{value}</StyledAttrContent>
  </StyledAttr>
)

Attribute.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    confidence: PropTypes.number.isRequired,
    value: PropTypes.string,
  }).isRequired,
  showConfidence: PropTypes.bool,
}

Attribute.defaultProps = {
  showConfidence: false,
}

// face component
const StyledFace = styled(Box)``;

const Face = ({ face, ...props }) => {
  console.log(face);
  return (
    <StyledFace {...props} >
      
    </StyledFace>
  );
};

const AttributePropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  confidence: PropTypes.number.isRequired,
  value: PropTypes.string,
});

Face.propTypes = {
  face: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }),
    age: PropTypes.shape({
      low: PropTypes.number.isRequired,
      high: PropTypes.number.isRequired,
    }),
    emotions: PropTypes.arrayOf(AttributePropType).isRequired,
    attributes: PropTypes.arrayOf(AttributePropType).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

// faces wrapper component
const StyledFaces = styled(Box)``;

const Faces = (props) => (
  <StyledFaces>
    {props.faces.map((face) => (
      <Face
        key={`face_item_${face.id}`}
        face={face}
        onClick={() => props.onFaceClick(face)}
      />
    ))}
  </StyledFaces>
);

Faces.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onFaceClick: PropTypes.func.isRequired,
};

export default Faces;
