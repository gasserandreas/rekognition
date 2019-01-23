import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import LoadingIndicator from './LoadingIndicator';

const StyledAsyncContainer = styled(Box)``;

const AsyncContainer = ({loading, children, ...props}) => (
  <StyledAsyncContainer {...props}>
    { loading ? <LoadingIndicator /> : children }
  </StyledAsyncContainer>
);

AsyncContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

AsyncContainer.defaultProps = {
  loading: false,
}

export default AsyncContainer;