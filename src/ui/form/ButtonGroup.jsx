import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// button groups
const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
`;

/** Simple component to render button consistently in every form.
 * Every children (Button) gets moved to right.
 */
const ButtonGroup = (props) => (
  <StyledButtonGroup>
    {props.children}
  </StyledButtonGroup>
);

ButtonGroup.propTypes = {
  /** Specify children (Button comp) */
  children: PropTypes.node.isRequired,
};

export default ButtonGroup;
