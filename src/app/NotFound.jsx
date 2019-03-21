import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading } from 'grommet';

import View from '../ui/View';

import { Colors } from '../styles';
import * as Paths from '../paths';

const timer = 5;

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

const NotFound = (props) => {
  const [counter, setCounter] = useState(0);

  // handle timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);

    if (counter >= timer) {
      // move away
      props.history.push(Paths.HOME);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  // move to index after 5 seconds
  const showCounter = (timer, counter) => {
    const diff = timer - counter;
    
    if (diff <= 0) {
      return 'now';
    }

    return `${diff} seconds`;
  }

  return (
    <StyledNotFound>
        <Heading level={1}>
          <p>
            <strong>Whhooppss</strong>
            {' '}
            it seems there is no page for route:
            <code>{props.location.pathname}</code>
          </p>
          <p>Forward to home page in: {showCounter(timer, counter)}.</p>
        </Heading>
      </StyledNotFound>
  );
}

NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFound;
