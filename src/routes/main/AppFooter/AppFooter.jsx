import React from 'react';
import { Link } from 'react-router-dom';

import * as Paths from '../../../enums/Paths';

import './AppFooter.css';

const AppFooter = ({ sidebar }) => {
  const className = sidebar ? 'sidebar' : '';
  return (
    <footer className={className} aria-label="app-footer">
      <div className="wrapper">
        <div className="left">
          <Link to={Paths.PRIVACY}>Privacy</Link>
          <a href="https://aws.amazon.com/rekognition/" rel="noreferrer noopener" target="_blank">AWS Rekognition</a>
        </div>
        <div className="right">
          <span>
            &copy; 2018
            <a
              href="https://andreasgasser.com"
              rel="noreferrer noopener"
              target="_blank"
            >Andreas Gasser</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
