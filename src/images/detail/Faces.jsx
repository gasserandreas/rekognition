import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import Label from './Label';

const AttributePropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  confidence: PropTypes.number.isRequired,
  value: PropTypes.string,
});

const StyledAttrLabel = styled.label`
  font-weight: ${props => props.bold ? 600 : 400};
  flex-shrink: 0;
  flex-grow: 0;
  width: 7rem;
  margin-right: 0.5rem;
  text-transform: capitalize;
`;

const StyledAttrContent = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
`;

const StyledAttr = styled(Box)`
  margin-bottom: 0.25rem;
`;

const Attribute = ({
  attribute: {
    name,
    confidence,
    value,
  },
  showConfidence,
  boldLabel,
}) => (
  <StyledAttr
    fill
    direction="row"
    alignContent="between"
  >
    <StyledAttrLabel bold={boldLabel}>{name}</StyledAttrLabel>
    <StyledAttrContent>{value}</StyledAttrContent>
  </StyledAttr>
)

Attribute.propTypes = {
  attribute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    confidence: PropTypes.number,
    value: PropTypes.string,
  }).isRequired,
  showConfidence: PropTypes.bool,
  boldLabel: PropTypes.bool,
}

Attribute.defaultProps = {
  showConfidence: false,
  boldLabel: true,
};

// emotions
const StyledEmotions = styled.div``;

const Emotions = ({ faceId, emotions, ...props }) => (
  <StyledEmotions {...props}>
    <StyledAttrLabel
      style={{ display: 'block'}}
      bold
    >Emotions</StyledAttrLabel>
      {emotions.map(({ name, confidence }) => (
        <Label
          key={`face_${faceId}_emotion_label_${name}`}
          label={{ name, confidence }}
        />
      ))}
  </StyledEmotions>
);

Emotions.propTypes = {
  faceId: PropTypes.string.isRequired,
  emotions: PropTypes.arrayOf(AttributePropType).isRequired,
};

// attributes wrapper
const StyledAttributesWrapper = styled(Box)``;

// face component
const StyledFace = styled(Box)`
  margin-bottom: 0.5rem
`;

const Face = ({ face, number, ...props }) => {
  const { id, age, attributes, emotions } = face;

  // generate age attribute
  const ageAttribute = {
    name: 'age',
    confidence: 100,
    value: `${age.low} - ${age.high}`,
  };

  // generate other attributes
  const filteredAttributes = attributes.filter(item => (
    item.name !== 'brightness' &&
    item.name !== 'sharpness'
  ));

  return (
    <StyledFace {...props} >
      <h3 level="1">Face {number}</h3>
      <StyledAttributesWrapper>
        <Attribute attribute={ageAttribute} />
        {filteredAttributes.map(attr => (
          <Attribute
            attribute={attr}
            key={`face_attribute_${id}_${attr.name}`}
          />
        ))}
        <Emotions
          faceId={id}
          emotions={emotions}
        />
      </StyledAttributesWrapper>
    </StyledFace>
  );
};

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
    {props.faces.map((face, i) => (
      <Face
        number={i + 1}
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
