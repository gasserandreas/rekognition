import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors } from '../styles';

const StyledTopBar = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.75rem;
  padding: 0.25rem 0.5rem;
  background-color: ${Colors.Neutrals.Light};
`;

const TopBar = ({ children, ...props }) => (
  <StyledTopBar
    align="baseline"
    direction="row"
    elevation="small"
    fill
    {...props}
  >
    {children}
  </StyledTopBar>
);

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TopBar;
