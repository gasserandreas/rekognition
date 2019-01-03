import React from 'react';
import styled from 'styled-components';
import * as Grommet from 'grommet';

import { Colors } from '../styles';

// input components
const StyledTextInput = styled(Grommet.TextInput)`
  ${props => props.error ? `
    border-color: ${Colors.Red.Default};
  ` : ''}
  &:disabled {
    color: ${Colors.Neutrals.Mid};
  }
`;

export const TextInput = (props) => <StyledTextInput {...props} />;


const StyledCheckBox = styled(Grommet.CheckBox)`
  ${props => props.error ? `
    border-color: ${Colors.Red.Default};
    color: ${Colors.Red.Default};
  ` : ''}
`;

export const CheckBox = props => <StyledCheckBox {...props} />;

// general components
const StyledFieldFeedback = styled.div`
  color: ${Colors.Red.Default};
  margin: .2rem 0.1rem;
  font-weight: 500;
`;

export const FieldFeedback = ({ error }) =>
  error ? <StyledFieldFeedback>{error}</StyledFieldFeedback> : null;

const StyledFieldLabel = styled.label`
  color: ${Colors.ColorsPalette.TextFaded};
  font-weight: 500;
  font-size: .925rem;
  margin-bottom: .15rem;
  margin-left: .1rem;
  display: inline-block;
`;

export const FieldLabel = ({ children, ...props }) => (
  <StyledFieldLabel {...props}>
    {children}
  </StyledFieldLabel>
);

const StyledField = styled.div`
  margin: .75rem 0;
`;

export const Field = ({ id, label, error, children, ...props }) => (
  <StyledField>
    {label && <FieldLabel htmlFor={id} error={error}>{label}</FieldLabel>}
    {children}
    <FieldFeedback error={error} />
  </StyledField>
);