import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

export const AttributePropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  confidence: PropTypes.number,
  value: PropTypes.string,
});

// components
const StyledConfidence = styled.span`
  display: inline-block;
  margin-left: 0.25rem;
  &:before {
    content: "(";
  }
  
  &:after {
    content: ")";
  }
`;

export const StyledAttrLabel = styled.label`
  font-weight: ${props => props.bold ? 600 : 400};
  flex-shrink: 0;
  flex-grow: 0;
  width: 7rem;
  margin-right: 0.5rem;
  text-transform: capitalize;
`;

export const StyledAttrContent = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
`;

const StyledAttr = styled(Box)`
  margin-bottom: 0.25rem;
`;

export const Attribute = ({
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
    <StyledAttrContent>
      {value}
      {showConfidence && (
        <StyledConfidence>{String(confidence).substring(0,5)}</StyledConfidence>
      )}
    </StyledAttrContent>
  </StyledAttr>
)

Attribute.propTypes = {
  attribute: AttributePropType.isRequired,
  showConfidence: PropTypes.bool,
  boldLabel: PropTypes.bool,
}

Attribute.defaultProps = {
  showConfidence: false,
  boldLabel: true,
};

export default Attribute;
