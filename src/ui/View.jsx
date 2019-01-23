import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading } from 'grommet';

import { Sizes } from '../styles';

// view
const StyledView = styled(Box)`
  position: relative;
  padding-top: ${Sizes.Header.height};
`;

export const View = ({ children, ...props }) => (
  <StyledView flex fill pad="small" {...props}>
    {children}
  </StyledView>
);

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
