import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Anchor } from 'grommet';
import { LinkPrevious } from 'grommet-icons';

import TopBar from '../../ui/TopBar';
import { Colors } from '../../styles';

const StyledGoBackIcon = styled(LinkPrevious)`
  width: 1rem;
  margin-right: 0.25rem;
`;

const StyledGoBackLink = styled(Anchor)`
  display: flex;
  align-items: center;
  color: ${Colors.ColorsPalette.Text};
  font-weight: 400;
  padding: 0.3rem 0;

  &:hover {
    color: ${Colors.ColorsPalette.Brand};
    // text-decoration: none;

    svg {
      fill: ${Colors.ColorsPalette.Brand};
      stroke: ${Colors.ColorsPalette.Brand};
    }
  }
`;

const StyledDetailTopBar = styled(TopBar)`
  justify-content: space-between;
`;

const DetailTopBar = (props) => (
  <StyledDetailTopBar alignContent="between">
    <Box>
      <StyledGoBackLink onClick={props.onGoBackClick}>
        <StyledGoBackIcon />
        Go back
      </StyledGoBackLink>
    </Box>
  </StyledDetailTopBar>
);

DetailTopBar.propTypes = {
  onGoBackClick: PropTypes.func.isRequired,
};

export default DetailTopBar;
