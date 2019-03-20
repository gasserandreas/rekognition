import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Colors } from '../../styles';

export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
};

const getColor = (props) => {
  switch (props.appearance) {
    case MESSAGE_TYPES.ERROR:
      return Colors.ColorsPalette.TextInvers;
    default:
      return Colors.ColorsPalette.Text;
  }
}

const getBackgroundColor = (props) => {
  switch (props.appearance) {
    case MESSAGE_TYPES.ERROR:
      return Colors.Red.Default;
    case MESSAGE_TYPES.WARNING:
      return Colors.Orange.Default;
    default:
      return 'inherit';
  }
}

const getBorderColor = (props) => {
  switch (props.appearance) {
    case MESSAGE_TYPES.ERROR:
      return Colors.Red.Default;
    case MESSAGE_TYPES.WARNING:
      return Colors.Orange.Default;
    default:
      return Colors.Neutrals.LightDark;
  }
}

/* istanbul ignore next */
const StyledMessage = styled.div`
  color: ${props => getColor(props)};
  background-color: ${props => getBackgroundColor(props)};
  border-color: ${props => getBorderColor(props)};
  border-width: ${props => props.border ? '1px' : '0'};
  border-style: solid;
  border-radius: ${props => props.rounded ? '2px' : '0'};
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  padding: 0.5rem 0.75rem;
`;

const Message = ({ children, ...props}) => (
  <StyledMessage {...props}>
    {children}
  </StyledMessage>
);

Message.propTypes = {
  appearance: PropTypes.oneOf([
    MESSAGE_TYPES.INFO,
    MESSAGE_TYPES.ERROR,
    MESSAGE_TYPES.WARNING,
  ]),
  children: PropTypes.node.isRequired,
  border: PropTypes.bool,
  rounded: PropTypes.bool,
};

Message.defaultProps = {
  appearance: MESSAGE_TYPES.INFO,
  border: false,
  rounded: true,
};

export const __testables__ = {
  getColor,
  getBorderColor,
  getBackgroundColor,
  StyledMessage,
};

export default Message;
