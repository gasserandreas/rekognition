import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Anchor } from 'grommet';

import { Colors, MediaSize, Sizes } from '../styles';

const getColor = props => (props.alternativeColor ? Colors.ColorsPalette.White : Colors.ColorsPalette.TextFaded);
const getBackgroundColor = ({ alternativeColor }) => (alternativeColor ? Colors.ColorsPalette.Background : 'inherit');
const getWithSidebar = ({ withSidebar }) => (withSidebar
  ? `
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
`
  : '');

const getLinkColor = ({ alternativeColor }) => (alternativeColor
  ? Colors.ColorsPalette.White
  : Colors.Neutrals.MidDark);

const StyledFooter = styled(Box)`
  width: 100%;
  color: ${props => getColor(props)};
  background-color: ${props => getBackgroundColor(props)};
  ${props => getWithSidebar(props)}

  a {
    color: ${props => getLinkColor(props)};
    font-weight: 600;
  }
`;

const Footer = ({ withSidebar, alternativeColor, ...props }) => (
  <StyledFooter
    {...props}
    tag="footer"
    direction="column"
    align="center"
    pad={{ vertical: 'xsmall' }}
    withSidebar={withSidebar}
    alternativeColor={alternativeColor}
  >
    <span>
      Created by:
      <Anchor target="_blank" href="https://andreasgasser.com">
        Andreas Gasser
      </Anchor>
    </span>
  </StyledFooter>
);

Footer.propTypes = {
  withSidebar: PropTypes.bool,
  alternativeColor: PropTypes.bool,
};

Footer.defaultProps = {
  withSidebar: false,
  alternativeColor: false,
};

export const __testables__ = {
  StyledFooter,
  getColor,
  getBackgroundColor,
  getWithSidebar,
  getLinkColor,
};

export default Footer;
