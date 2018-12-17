import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const Styles = {
  NotFound: css`
    margin-top: 2rem;

    h1 {
      width: 80%;
      margin: 0 auto;
      font-size: 2.5rem;
    }
    
    code {
      color: red;
      padding: 0 0.25rem;
    }
  `,
};

const NotFound = ({ location }) => (
  <div className={Styles.NotFound}>
    <h1>
      <strong>Whhooppss</strong>
      {' '}
it seems there is no page for route:
      <code>{location.pathname}</code>
    </h1>
  </div>
);

NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFound;
