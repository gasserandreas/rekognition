import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors, Sizes } from '../styles';

const StyledTopBar = styled(Box)`
  position: fixed;
  top: ${Sizes.Header.height};
  left: 0;
  right: 0;
  height: ${Sizes.TopBar.height};
  padding: 0.25rem 0.5rem;
  background-color: ${Colors.Neutrals.Light};
  z-index: 50;
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
