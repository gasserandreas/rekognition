import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading } from 'grommet';

import View from '../ui/View';

import { Colors } from '../styles';

const StyledNotFound = styled(View)`
  margin-top: 2rem;

  h1 {
    width: 80%;
    margin: 0 auto;
    font-size: 2.5rem;
  }

  code {
    color: ${Colors.ColorsPalette.Brand};
    padding: 0 0.25rem;
  }
`;

const NotFound = ({ location }) => (
  <StyledNotFound>
    <Heading level={1}>
      <p>
        <strong>Whhooppss</strong>
        {' '}
it seems there is no page for route:
        <code>{location.pathname}</code>
      </p>
    </Heading>
  </StyledNotFound>
);

NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFound;
