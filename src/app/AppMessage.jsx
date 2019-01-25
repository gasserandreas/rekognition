import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import { Colors, MediaSize } from '../styles';

const StyledAppMessage = styled(Box)`
  position: fixed;
  padding: 1rem 2rem;
  left: 0;
  right: 0;
  bottom: ${props => props.show ? '0rem' : '-5rem'};
  height: 5rem;
  color: ${Colors.ColorsPalette.White};
  background-color: ${Colors.Red.Default};
  z-index: 1000;
  transition: bottom ease-in-out 500ms;

  @media (min-width: ${MediaSize.Tablet}) {
    padding: 1.5rem 4rem;
    height: 5rem;
  }
`;

const AppMessage = ({ message, ...props }) => (<StyledAppMessage {...props}>
    {message}
  </StyledAppMessage>
);

AppMessage.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
}

export default AppMessage;
