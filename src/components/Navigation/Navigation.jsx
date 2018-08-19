import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Button from '../Button/Button';

import './Navigation.css';

class Navigation extends Component {
  static propTypes = {
    openDrawer: PropTypes.func.isRequired,
  };

  dropZoneRef = null;
  onClickAnalyseButton = this.onClickAnalyseButton.bind(this);
  onDropFiles = this.onDropFiles.bind(this);

  onDropFiles(files) {
    if (files.length === 1) {
      this.props.addImage(files[0]);
    }
  }

  onClickAnalyseButton() {
    this.dropZoneRef.open();
  }

  static defaultProps = {};
  render() {
    return (
      <nav>
        <a
          className="previous"
          onClick={() => this.props.openDrawer()}
          role="button"
          tabIndex="0"
        >Show previous</a>
        <div className="controls">
          <Button color="green" onClick={this.onClickAnalyseButton}>Upload / Analyse</Button>
          <Dropzone
            ref={(el) => { this.dropZoneRef = el; }}
            onDrop={this.onDropFiles}
            className="dropzone"
            multiple={false}
          />
        </div>
      </nav>
    );
  }
};

export default Navigation;
