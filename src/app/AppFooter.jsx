import React from 'react';
import styled from 'styled-components';
import { Anchor } from 'grommet';

import { Colors } from '../styles';

const StyledAppFooter = styled.div`
  color: ${Colors.ColorsPalette.TextFaded};

  a {
    color: ${Colors.Neutrals.MidDark};
    font-weight: 600;
  }
`;

const AppFooter = () => (
  <StyledAppFooter>
    Created by: <Anchor href="https://andreasgasser.com">Andreas Gasser</Anchor>
  </StyledAppFooter>
);

export default AppFooter;
