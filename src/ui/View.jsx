import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

const StyledView = styled(Box)``;

const View = (props) => (
  <StyledView flex fill pad="small" {...props} />
);

View.propTypes = {
  children: PropTypes.node.isRequired,
};

export default View;
