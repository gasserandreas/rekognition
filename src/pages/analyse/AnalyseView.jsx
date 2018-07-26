import React from 'react';

import DataContainer from './data/DataContainer';
import PictureContainer from './picture/PictureContainer';

import './AnalyseView.css';

const AnalyseView = () => (
  // <div className="analyse-view">
  <React.Fragment>
    <div className="image-container">
      <PictureContainer />
    </div>
    <div className="data-container">
      <DataContainer />
    </div>
  </React.Fragment>
  // </div>
);

export default AnalyseView;
