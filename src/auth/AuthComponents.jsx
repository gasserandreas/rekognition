import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Heading,
} from 'grommet';

import { Colors } from '../styles';

// large auth header 
const StyledAuthHeader = styled(Heading)`
  color: ${Colors.ColorsPalette.White};
  text-align: center;
  margin: 5rem 0 0;
  display: block;
  max-width: inherit;
`;

export const AuthHeader = (props) => (
  <StyledAuthHeader level="2">
      {props.children}
  </StyledAuthHeader>
);

AuthHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

// auth footer
const StyledAuthFooter = styled.span`
  a {
    color: ${Colors.ColorsPalette.White};
    text-decoration: none;
    text-align: center;
    display: block;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const AuthFooter = (props) => (
  <StyledAuthFooter>
    <Link to={props.href}>
      {props.children}
    </Link>
  </StyledAuthFooter>
);

AuthFooter.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

