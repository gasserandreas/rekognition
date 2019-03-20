import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors } from '../styles';

export const StyledCard = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
  border-radius: 3px;
  box-sizing: border-box;
  margin: 1rem 0;
`;

const Card = ({ children, ...props }) => (
  <StyledCard
    elevation="small"
    pad="medium"
    {...props}
  >{children}</StyledCard>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
