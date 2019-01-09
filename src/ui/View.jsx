import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading } from 'grommet';

import { Sizes } from '../styles';

// view
const StyledView = styled(Box)`
  position: relative;
  ${props => props.topBar
    ? `padding-top: ${Sizes.TopBar.height}`
    : ''
  }
`;

export const View = ({ children, ...props }) => {
  const { topBar } = props;

  return (
    <StyledView flex fill pad="small" {...props}>
      {topBar}
      {children}
    </StyledView>
  );
}

View.propTypes = {
  children: PropTypes.node.isRequired,
};

// heading
const StyledHeading = styled(Heading)`
  margin: 0;
  max-width: 100%;
`;

export const ViewHeading = (props) => (
  <StyledHeading level="4" {...props} />
);

View.propTypes = {
  children: PropTypes.node.isRequired,
};

export default View;
