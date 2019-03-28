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

/** Default wrapper for application usafge */
export const View = ({ children, ...props }) => (
  <StyledView flex fill pad="small" {...props}>
    {children}
  </StyledView>
);

View.propTypes = {
  /** Add view content here */
  children: PropTypes.node.isRequired,
};

// heading
const StyledHeading = styled(Heading)`
  margin: 0;
  max-width: 100%;
`;

/** Default heading for view */
export const ViewHeading = (props) => (
  <StyledHeading level="4" {...props} />
);

View.propTypes = {
  /** Add view header here */
  children: PropTypes.node.isRequired,
};

export default View;
