import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FileUpload from 'react-dropzone';
import uuid from 'uuid';

import Button from '../../../components/FormComponents/Button/Button';

import * as Paths from '../../../enums/Paths';

import './UploadButton.css';

class UploadButton extends Component {
  uploadRef = null;

  uploadImage = this.uploadImage.bind(this);
  openFileUploader = this.openFileUploader.bind(this);

  openFileUploader() {
    this.uploadRef.open();
  }

  uploadImage(files) {
    if (files.length > 0) {
      const id = uuid.v4();
      this.props.postImage(id, files[0]);

      // go to detail page
      const url = `${Paths.GET_IMAGES_DETAILS(id)}`;
      this.props.history.push(url);
    }
  }

  render() {
    return (
      <Fragment>
        <FileUpload
          style={{
            display: 'none',
            visability: 'hidden',
          }}
          onDrop={this.uploadImage}
          ref={(el) => { if (el) { this.uploadRef = el; }}}
        />
        <Button
            onClick={this.openFileUploader}
            className="upload-button"
            filled
          >
            <Fragment>
              <span className="text">Upload</span>
              <span className="full-size">
                <i className="fas fa-plus icon" />&nbsp;
                Upload new
              </span>
            </Fragment>
        </Button>
      </Fragment>
    );
  }
}

UploadButton.propTypes = {
  postImage: PropTypes.func.isRequired,
};

export default UploadButton;
