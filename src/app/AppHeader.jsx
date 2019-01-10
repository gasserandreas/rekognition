import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Box } from 'grommet';
import { User } from 'grommet-icons';

import { Colors, MediaSize } from '../styles';

import * as Paths from '../paths';

const StyledLogo = styled(Box)`
  flex-shrink: 1;
  flex-grow: 1;
  color: #333;
`;

const StyledLogoIcon = styled.div`
  font-weight: 300;
  font-size: 2rem;
  color: #666;
  margin-right: 1rem;
  text-decoration: none;
`;

const StyledAppName = styled.h1`
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 6px;
  text-decoration: none;

  @media (max-width: ${MediaSize.Phone}) {
    display: none;
  }
`;

const StyledUserIcon = styled.div`
  flex-shrink: 0;
  flex-grow: 0;

  a:hover {
    
  }
`;

const StyledAppHeader = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5rem;

  a {
    text-decoration: none;
  }
`;

const AppHeader = () => {

  return (
    <StyledAppHeader
      tag="header"
      direction="row"
      align='center'
      justify='between'
      pad="small"
      elevation="small"
    >
      <Link to={Paths.HOME}>
        <StyledLogo
          direction="row"
          pad="none"
          align='center'
        >
          <StyledLogoIcon>AR</StyledLogoIcon>
          <StyledAppName
            level="4"
          >Test application</StyledAppName>
      </StyledLogo>
      </Link>
      <StyledUserIcon>
        <Link to={Paths.USER}>
          <User />
        </Link>
      </StyledUserIcon>
    </StyledAppHeader>
  )
}

export default AppHeader;

// import {
//   Box,
//   Heading,
// } from 'grommet';

// import { Colors, Sizes } from '../styles';
// import * as Paths from '../paths';

// const StyledHeading = styled(Heading)`
//   font-weight: 500;
//   color: ${Colors.ColorsPalette.White};
//   margin-top: 0.85rem;
//   margin-bottom: 0.85rem;
// `;

// const StyledUserProfile = styled.div`
//   font-size: 1rem;
//   text-transform: capitalize;
// `;

// const UserProfile = (props) => (
//   <StyledUserProfile>
//     <Link to={Paths.USER}>
//       <span className="username">{props.username}</span>
//     </Link>
//   </StyledUserProfile>
// );

// const StyledHeader = styled(Box)`
//   background-color: ${Colors.ColorsPalette.Background};
//   color: ${Colors.ColorsPalette.White};
//   height: ${Sizes.Header.height};
//   z-index: 100;
//   padding: 0 12px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;

//   a {
//     color: ${Colors.ColorsPalette.White};
//     text-decoration: none;

//     &:hover {
//       color: ${Colors.Neutrals.LightDark};
//     }
//   }
// `;

// const AppHeader = (props) => {
//   const { isAuthenticated, username } = props;
//   return (
//     <StyledHeader
//       tag="header"
//       direction="row"
//       align='center'
//       justify='between'
//     >
//       <Link to={Paths.HOME}>
//         <StyledHeading  level={4}>AWS Rekognition</StyledHeading>
//       </Link>
//       {isAuthenticated && <UserProfile username={username} />}
//     </StyledHeader>
//   )
// };

// export default AppHeader;
