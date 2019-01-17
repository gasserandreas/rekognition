import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Text, Paragraph } from 'grommet';

import Label from './Label';
import { Attribute, StyledAttrLabel, AttributePropType } from './Attribute';

import { Colors } from '../../styles';

// emotions
const StyledEmotions = styled.div`
  label {
    margin-bottom: 0.25rem;
  }
`;

const Emotions = ({ faceId, emotions, ...props }) => (
  <StyledEmotions {...props}>
    <StyledAttrLabel
      style={{ display: 'block'}}
      bold
    >Emotions</StyledAttrLabel>
      {emotions
        .sort((a, b) => a.confidence < b.confidence ? 1 : -1)
        .map(({ name, confidence }) => (
          <Label
            key={`face_${faceId}_emotion_label_${name}`}
            label={{ name, confidence }}
          />
        )
      )}
  </StyledEmotions>
);

Emotions.propTypes = {
  faceId: PropTypes.string.isRequired,
  emotions: PropTypes.arrayOf(AttributePropType).isRequired,
};

// face component
const StyledFace = styled(Box)`
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${Colors.Neutrals.LightMid};
    cursor: pointer;
  }
`;

StyledFace.propTypes = {
  selected: PropTypes.bool,
}

StyledFace.defaultProps = {
  selected: false,
}

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
      <h3 level="1">
        Face {number}
        {props.selected && <Text color="brand" size="small">{' '}(selected)</Text>}
      </h3>
      <Box>
        <Attribute attribute={ageAttribute} />
        {filteredAttributes.map(attr => (
          <Attribute
            attribute={attr}
            key={`face_attribute_${id}_${attr.name}`}
            showConfidence
          />
        ))}
        <Emotions
          faceId={id}
          emotions={emotions}
        />
      </Box>
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

const Faces = ({ faces, onFaceClick, selectedFace, ...props }) => (
  <StyledFaces {...props}>
    <Paragraph size="small" margin="none">Hint: Click on faces to visualize selected face.</Paragraph>
    {faces.map((face, i) => (
      <Face
        number={i + 1}
        key={`face_item_${face.id}`}
        face={face}
        onClick={() => onFaceClick(face)}
        selected={selectedFace && selectedFace.id === face.id}
      />
    ))}
  </StyledFaces>
);

Faces.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedFace: PropTypes.shape({}),
  onFaceClick: PropTypes.func.isRequired,
};

Faces.defaultProps = {
  selectedFace: {
    id: null,
  },
}

export default Faces;
