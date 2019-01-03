import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Colors } from '../styles';

const StyledCard = styled.div`
  background-color: ${Colors.ColorsPalette.White};
  padding: 3rem 2rem;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 10px;
  box-sizing: border-box;
`;

const Card = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
