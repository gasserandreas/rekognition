import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading} from 'grommet';

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

class NotFound extends Component {
  timer = null;

  componentWillMount() {
    setTimeout(() => {
      const { history } = this.props;
      history.push(Paths.HOME);
    }, timer * 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <StyledNotFound>
        <Heading level={1}>
          <p>
          <strong>Whhooppss</strong>
          {' '}
    it seems there is no page for route:
          <code>{this.props.location.pathname}</code></p>
          <p>Forward to home page in: {timer} seconds.</p>
        </Heading>
      </StyledNotFound>
    );
  }
}

NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFound;
