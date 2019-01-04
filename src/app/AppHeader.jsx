import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Box,
  Heading,
} from 'grommet';

import { Colors } from '../styles';
import * as Paths from '../paths';

const StyledHeading = styled(Heading)`
  font-weight: 500;
  color: ${Colors.ColorsPalette.White};
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

const StyledHeader = styled.div`
  background-color: ${Colors.ColorsPalette.Background};
  color: ${Colors.ColorsPalette.White};

  a {
    color: ${Colors.ColorsPalette.White};
    text-decoration: none;

    &:hover {
      color: ${Colors.Neutrals.LightDark};
    }
  }
`;

const AppHeader = (props) => {
  const { isAuthenticated, username } = props;
  return (
    <StyledHeader>
      <Box
        tag="header"
        direction="row"
        align='center'
        justify='between'
        pad={{ left: 'small', right: 'small', vertical: 'none' }}
      >
        <Link to={Paths.HOME}>
          <StyledHeading  level={4}>AWS Rekognition</StyledHeading>
        </Link>
        {isAuthenticated && <UserProfile username={username} />}
      </Box>
    </StyledHeader>
  )
};

export default AppHeader;
