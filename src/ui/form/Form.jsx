import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Grommet from 'grommet';

import { Colors, MediaSize } from '../../styles';

// input components
export const StyledTextInput = styled(Grommet.TextInput)`
  ${props => props.error ? `
    border-color: ${Colors.Red.Default};
  ` : ''}
  &:disabled {
    color: ${Colors.Neutrals.Mid};
  }
`;

export const TextInput = (props) => <StyledTextInput {...props} />;


export const StyledCheckBox = styled(Grommet.CheckBox)`
  ${props => props.error ? `
    border-color: ${Colors.Red.Default};
    color: ${Colors.Red.Default};
  ` : ''}
`;

export const CheckBox = props => <StyledCheckBox {...props} />;

// general components
export const StyledFieldFeedback = styled.div`
  color: ${Colors.Red.Default};
  margin: .2rem 0.1rem;
  font-weight: 500;
`;

export const StyledFieldLabel = styled.label`
  color: ${Colors.ColorsPalette.TextFaded};
  font-weight: 500;
  font-size: .925rem;
  margin-bottom: .15rem;
  margin-left: .1rem;
  display: inline-block;
`;

export const StyledField = styled.div`
  margin: .75rem 0;

  ${props => props.inline ? `
    flex-grow: 1;
    flex-shrink: 1;
  ` : ''}
`;

export const Field = ({ id, label, error, children, ...props }) => (
  <StyledField {...props}>
    {label && <StyledFieldLabel htmlFor={id}>{label}</StyledFieldLabel>}
    {children}
    {error && <StyledFieldFeedback>{error}</StyledFieldFeedback>}
  </StyledField>
);

Field.propTypes = {
  inline: PropTypes.bool,
}

Field.defaultProps = {
  inline: false,
}

export const StyledFieldRow = styled(Grommet.Box)`
  @media (min-width: ${MediaSize.Tablet}) {
    flex-direction: row;

    & > * {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
`;

export const FieldRow = ({ children, ...props }) => (
  <StyledFieldRow
    direction="column"
    {...props}
  >
    {children}
  </StyledFieldRow>
)