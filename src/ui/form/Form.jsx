import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Grommet from 'grommet';

import { Colors, MediaSize } from '../../styles';

/* istanbul ignore next */
const StyledTextInput = styled(Grommet.TextInput)`
  ${props => (props.error
    ? `
    border-color: ${Colors.Red.Default};
  `
    : '')}
  &:disabled {
    color: ${Colors.Neutrals.Mid};
  }
`;

export const TextInput = props => <StyledTextInput {...props} />;

/* istanbul ignore next */
const StyledCheckBox = styled(Grommet.CheckBox)`
  ${props => (props.error
    ? `
    border-color: ${Colors.Red.Default};
    color: ${Colors.Red.Default};
  `
    : '')}
`;

export const CheckBox = props => <StyledCheckBox {...props} />;

// general components
const StyledFieldFeedback = styled.div`
  color: ${Colors.Red.Default};
  margin: 0.2rem 0.1rem;
  font-weight: 500;
`;

const StyledFieldLabel = styled.label`
  color: ${Colors.ColorsPalette.TextFaded};
  font-weight: 500;
  font-size: 0.925rem;
  margin-bottom: 0.15rem;
  margin-left: 0.1rem;
  display: inline-block;
`;

/* istanbul ignore next */
const StyledField = styled.div`
  margin: 0.75rem 0;

  ${props => (props.inline
    ? `
    flex-grow: 1;
    flex-shrink: 1;
  `
    : '')}
`;

export const Field = ({
  id, label, error, children, ...props
}) => (
  <StyledField {...props}>
    {label && <StyledFieldLabel htmlFor={id}>{label}</StyledFieldLabel>}
    {children}
    {error && <StyledFieldFeedback>{error}</StyledFieldFeedback>}
  </StyledField>
);

Field.propTypes = {
  inline: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  error: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Field.defaultProps = {
  inline: false,
  error: undefined,
};

const StyledFieldRow = styled(Grommet.Box)`
  @media (min-width: ${MediaSize.Tablet}) {
    flex-direction: row;

    & > * {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
`;

/** Render multiple fields on the same */
export const FieldRow = ({ children, ...props }) => (
  <StyledFieldRow direction="column" {...props}>
    {children}
  </StyledFieldRow>
);

FieldRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export const __testables__ = {
  StyledTextInput,
  StyledCheckBox,
  StyledFieldFeedback,
  StyledFieldLabel,
  StyledField,
  StyledFieldRow,
};
