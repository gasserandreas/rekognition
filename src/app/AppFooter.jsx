import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Anchor } from 'grommet';

import { Colors, MediaSize, Sizes } from '../styles';

const StyledAppFooter = styled(Box)`
  color: ${(props) => props.alternativeColor ? Colors.ColorsPalette.White : Colors.ColorsPalette.TextFaded};
  background-color: ${(props) => props.alternativeColor ? Colors.ColorsPalette.Background : 'inherit'};

  ${props => props.withSidebar ? `
    @media (min-width: ${MediaSize.Tablet}) {
      padding-left: ${Sizes.LeftBar.width.Tablet};
    }

    @media (min-width: ${MediaSize.Notebook}) {
      padding-left: ${Sizes.LeftBar.width.Notebook};
    }

    @media (min-width: ${MediaSize.Desktop}) {
      padding-left: ${Sizes.LeftBar.width.Desktop};
    }

    @media (min-width: ${MediaSize.Fullscreen}) {
      padding-left: ${Sizes.LeftBar.width.Fullscreen};
    }
  ` : ''}

  a {
    color: ${(props) => props.alternativeColor ? Colors.ColorsPalette.White : Colors.Neutrals.MidDark};
    font-weight: 600;
  }
`;

const AppFooter = ({ withSidebar, alternativeColor }) => (
  <StyledAppFooter
    tag='footer'
    direction='column'
    align='center'
    pad={{ vertical: 'xsmall' }}
    withSidebar={withSidebar}
    alternativeColor={alternativeColor}
  >
      <span>Created by: <Anchor target="_blank" href="https://andreasgasser.com">Andreas Gasser</Anchor></span>
  </StyledAppFooter>
);

AppFooter.propTypes = {
  withSidebar: PropTypes.bool,
}

AppFooter.defaultProps = {
  withSidebar: false,
}

export default AppFooter;
