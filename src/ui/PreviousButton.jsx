import React from 'react';
import styled from 'styled-components';

import { Previous } from 'grommet-icons';

import { Colors } from '../styles';

export const StyledPrevious = styled(Previous)`
  display: block;
  visibility: visible;

  &:hover {
    stroke: ${Colors.ColorsPalette.TextFaded};
    cursor: pointer;
  }
`;

/** Render go previous button as left arrow icon */
const PreviousButton = (props) => <StyledPrevious {...props} />;

export default PreviousButton;
