import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Grommet from 'grommet';

import { Colors } from '../styles';

const BUTTON_TYPES = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  WARNING: 'warning',
  ERROR: 'error',
  LINK: 'link',
};

// calculate background colors
const getBackgroundColor = props => {
  switch (props.buttonStyle) {
    case BUTTON_TYPES.PRIMARY:
      return Colors.Blue.Default;
    case BUTTON_TYPES.WARNING:
      return Colors.Orange.Default;
    case BUTTON_TYPES.ERROR:
      return Colors.Red.Default;
    case BUTTON_TYPES.LINK:
      return 'inherit';
    default:
      return 'rgba(9, 30, 66, 0.04)'
  }
}

const getBackgroundHoverColor = props => {
  switch (props.buttonStyle) {
    case BUTTON_TYPES.PRIMARY:
      return Colors.Blue.Light;
    case BUTTON_TYPES.WARNING:
      return Colors.Orange.Light;
    case BUTTON_TYPES.ERROR:
      return Colors.Red.Light;
    case BUTTON_TYPES.LINK:
      return 'inherit';
    default:
      return 'rgba(9, 30, 66, 0.08);';
  }
}

// text color
const getColor = props => {
  switch (props.buttonStyle) {
    case BUTTON_TYPES.PRIMARY:
    case BUTTON_TYPES.ERROR:
      return Colors.ColorsPalette.White;
    case BUTTON_TYPES.LINK:
      return Colors.Blue.Default;
    default:
      return '#494949';
  }
}

const StyledButton = styled(Grommet.Button)`
  border-radius: 3px;
  font-weight: 400;
  height: 34px;
  text-align: center;
  vertical-align: middle;
  padding: 0px 10px;
  border-width: 0;
  transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  outline: none !important;

  background-color: ${props => getBackgroundColor(props)};
  border-color: ${props => getBackgroundColor(props)};
  color: ${props => getColor(props)};

  &:hover {
    background-color: ${props => getBackgroundHoverColor(props)};
    pointer: cursor;
    text-decoration: ${props => props.buttonStyle === 'link' ? 'underline' : ''};
  }
`;

const Button = (props) => {

  return (
    <StyledButton {...props} />
  )
}

Button.propTypes = {
  buttonStyle: PropTypes.oneOf([
    BUTTON_TYPES.DEFAULT,
    BUTTON_TYPES.PRIMARY,
    BUTTON_TYPES.WARNING,
    BUTTON_TYPES.ERROR,
    BUTTON_TYPES.LINK,
  ]),
  children: PropTypes.node,
};

Button.defaultProps = {
  buttonStyle: BUTTON_TYPES.DEFAULT,
  children: null,
};

export default Button;
