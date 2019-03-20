import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Grommet from 'grommet';

import LoadingIndicator from '../async/LoadingIndicator';

import { Colors } from '../../styles';

export const BUTTON_TYPES = {
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
      return 'rgba(9, 30, 66, 0.08)';
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

export const StyledLoading = styled(LoadingIndicator)`
  width: 1.2rem;
  margin-left: 0.5rem;
`;

/* istanbul ignore next */
export const StyledButton = styled(Grommet.Button)`
  display: flex;
  align-items: center;
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
    /* istanbul ignore next */
    text-decoration: ${props => props.buttonStyle === 'link' ? 'underline' : ''};
  }
`;

const Button = ({ loading, children, ...props }) => (
  <StyledButton {...props}>
    {children}
    {loading && (
      <StyledLoading
        color={{
          light: Colors.ColorsPalette.White,
          default: Colors.ColorsPalette.White,
          dark: Colors.ColorsPalette.White,
        }}
        circleProps={{
          strokeWidth: 4,
        }}
      />
    )}
  </StyledButton>
);

Button.propTypes = {
  buttonStyle: PropTypes.oneOf([
    BUTTON_TYPES.DEFAULT,
    BUTTON_TYPES.PRIMARY,
    BUTTON_TYPES.WARNING,
    BUTTON_TYPES.ERROR,
    BUTTON_TYPES.LINK,
  ]),
  children: PropTypes.node,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  buttonStyle: BUTTON_TYPES.DEFAULT,
  children: null,
  loading: false,
};

export const __testables__ = {
  getBackgroundColor,
  getBackgroundHoverColor,
  getColor,
}

export default Button;
