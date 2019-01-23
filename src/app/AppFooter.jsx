import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Anchor } from 'grommet';

import { Colors, MediaSize, Sizes } from '../styles';

const StyledAppFooter = styled(Box)`
  color: ${Colors.ColorsPalette.TextFaded};

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
    color: ${Colors.Neutrals.MidDark};
    font-weight: 600;
  }
`;

const AppFooter = ({ withSidebar }) => (
  <StyledAppFooter
    tag='footer'
    direction='column'
    align='center'
    pad={{ vertical: 'xsmall' }}
    withSidebar={withSidebar}
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
