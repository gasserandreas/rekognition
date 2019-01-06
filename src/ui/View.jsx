import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading } from 'grommet';

// view
const StyledView = styled(Box)``;

export const View = (props) => (
  <StyledView flex fill pad="small" {...props} />
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
