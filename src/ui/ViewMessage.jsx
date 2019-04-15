import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors, MediaSize } from '../styles';

export const StyledViewMessage = styled(Box)`
  visibility: ${props => props.show ? 'visible' : 'none'};
  display: ${props => props.show ? 'block' : 'none' };
  position: fixed;

  /* positioning */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 1000;

  @media (min-width: ${MediaSize.Tablet}) {
    background-color: rgba(48, 48, 48, 0.4);
  }
`;

export const StyledViewMessageContent = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
  transition: top ease-in-out 500ms;
  padding: 2rem;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  
  @media (min-width: ${MediaSize.Tablet}) {
    top: ${props => props.show ? '10rem' : '-100%'};
    height: auto;
    width: 32rem;
    right: auto;
    left: 50%;
    margin-left: -16rem;
    padding: 1rem;
    min-height: 10rem;
    max-height: 30rem;
  }

  h1, h2, h3, h4, h5 {
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    margin: 0.5rem 0;
  }
`;

/** Show App message as application modal and use fullsize on mobile devices */
const ViewMessage = ({ children, show, ...props }) => (<StyledViewMessage show={show} {...props}>
    <StyledViewMessageContent elevation="xlarge" show={show}>
      {children}
    </StyledViewMessageContent>
  </StyledViewMessage>
);

ViewMessage.propTypes = {
  /** Required children node to be rendered within component */
  children: PropTypes.node.isRequired,
  /** Boolean indicating whether message is shown or not */
  show: PropTypes.bool,
}

ViewMessage.defaultProps = {
  show: false,
}

export default ViewMessage;
