import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// button groups
const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
`;

const ButtonGroup = (props) => (
  <StyledButtonGroup>
    {props.children}
  </StyledButtonGroup>
);

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonGroup;
