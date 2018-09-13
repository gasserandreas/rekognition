import React from 'react';
import { Link  } from 'react-router-dom';

import * as Paths from '../../../enums/Paths';

import './NotFound.css';

const NotFound = ({ location }) => {
  return (
    <div className="not-found-view center-view">
      <h1 className="title">Whooops you've reached a dead end with: <span className="route">{location.pathname}</span></h1>
      <p><Link to={Paths.INDEX}>Go back</Link> to start page.</p>
    </div>
  );
};

export default NotFound;
