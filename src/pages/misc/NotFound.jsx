import React from 'react';
import PropTypes from 'prop-types';

import './NotFound.css';

const NotFound = (props) => (
  <div className="not-found">
    <h1><strong>Whhooppss</strong> it seems there is no page for route: 
    <code>{props.location.pathname}</code>
    </h1>
  </div>
);

NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFound;
