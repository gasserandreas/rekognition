import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Colors } from '../../styles';

const hoverSelectedStyles = `
  cursor: pointer;
  background-color: ${Colors.Blue.Default};
  color: ${Colors.ColorsPalette.White};
`;

const handleLabelHover = ({ isClickable, selected }) => {
  if (selected) {
    return hoverSelectedStyles;
  }

  if (isClickable) {
    return `
      color: ${Colors.Blue.Default};
      border-color: ${Colors.Blue.Default};

      &:hover {
        ${hoverSelectedStyles}
      }
    `;
  }

  return '';
};

const StyledLabel = styled.div`
  border: 1.5px solid ${Colors.Neutrals.Mid};
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-block
  font-size: 0.8rem;
  margin-right: 0.25rem;
  margin-bottom: 0.5rem;

  span {
    font-size: 0.75rem;
  }

  ${props => handleLabelHover(props)}
`;

const Label = (props) => {
  const { label, ...rest } = props;
  const { name, confidence } = label;

  return (
    <StyledLabel {...rest}>
      {name}
      {' '}
      {confidence && (
      <span id="jestConfidence">
(
        {confidence.toFixed(2)}
)
      </span>
      )}
    </StyledLabel>
  );
};

Label.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    confidence: PropTypes.number,
    parents: PropTypes.arrayOf(PropTypes.string),
    instances: PropTypes.arrayOf(
      PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  onClick: PropTypes.func,
  isClickable: PropTypes.bool,
  selected: PropTypes.bool,
};

Label.defaultProps = {
  onClick: null,
  isClickable: false,
  selected: false,
};

export const __testables__ = {
  StyledLabel,
  handleLabelHover,
};

export default Label;
