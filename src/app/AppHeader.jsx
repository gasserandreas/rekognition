import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Box,
  Heading,
} from 'grommet';

import { Colors, Sizes } from '../styles';
import * as Paths from '../paths';

const StyledHeading = styled(Heading)`
  font-weight: 500;
  margin-top: 0.85rem;
  margin-bottom: 0.85rem;
`;

const StyledUserProfile = styled.div`
  font-size: 1rem;
  text-transform: capitalize;
`;

const UserProfile = (props) => (
  <StyledUserProfile>
    <Link to={Paths.USER}>
      <span className="username">{props.username}</span>
    </Link>
  </StyledUserProfile>
);

const StyledHeader = styled(Box)`
  ${(props) => props.isAuthenticated ? `
      color: ${Colors.ColorsPalette.Text};
      background-color: ${Colors.ColorsPalette.White};
      border-bottom: 1px solid #c9c9c9;

      a {
        color: ${Colors.ColorsPalette.Text};
        &:hover {
          color: ${Colors.ColorsPalette.TextFaded};
        }
      }
    ` : `
      background-color: ${Colors.ColorsPalette.Background};
      color: ${Colors.ColorsPalette.White};

      a {
        color: ${Colors.ColorsPalette.White};
        &:hover {
          color: ${Colors.Neutrals.LightDark};
        }
      }
    `
  }
  height: ${Sizes.Header.height};
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  a {
    text-decoration: none;
  }
`;

const AppHeader = (props) => {
  const { isAuthenticated, username } = props;
  return (
    <StyledHeader
      tag="header"
      direction="row"
      align='center'
      justify='between'
      isAuthenticated={isAuthenticated}
      pad={{ horizontal: "large", vertical: "none" }}
    >
      <Link to={Paths.HOME}>
        <StyledHeading  level={4}>AWS Rekognition</StyledHeading>
      </Link>
      {isAuthenticated && <UserProfile username={username} />}
    </StyledHeader>
  )
};

export default AppHeader;
