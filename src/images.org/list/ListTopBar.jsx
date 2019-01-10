import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import Button from '../../ui/Button';
import TopBar from '../../ui/TopBar';

const StyledListTopBar = styled(TopBar)`
  justify-content: space-between;
`;

const ListTopBar = (props) => (
  <StyledListTopBar alignContent="between">
    <Box>
      <Button
        onClick={props.listImages}
        buttonStyle="primary"
      >Request images</Button>
    </Box>
    <Box>
      Right content
    </Box>
  </StyledListTopBar>
);

ListTopBar.propTypes = {
  listImages: PropTypes.func.isRequired,
};

export default ListTopBar;
