import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import { Add } from 'grommet-icons';

import Button from '../ui/Button';

import { addImage } from '../redux/images';

import { Colors } from '../styles';

const StyledAddImageButton = styled(Button)`
  border-radius: 50%;
  width: 46px;
  height: 46px;
  position: fixed;
  right: 2.5rem;
  bottom: 2.5rem;
`;

class AddImageButton extends Component {
  uploadImage = this.uploadImage.bind(this);

  uploadImage(files) {
    // only supports single files
    if (files.length > 0) {
      files.forEach((file) => {
        this.props.addImage(file);
      });
    }
  }

  render() {
    return (
      <Dropzone
        onDrop={this.uploadImage}
        ref={(el) => { if (el) { this.uploadRef = el; }}}
      >{({getRootProps, getInputProps}) => (
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledAddImageButton
              {...this.props}
              type="button"
              icon={<Add color={Colors.ColorsPalette.White}/>}
              size="xlarge"
              buttonStyle="primary"
            />
          </span>
        )}
      </Dropzone>
    );
  }
}

// redux
const select = () => ({});

const mapDispatchToProps = ({
  addImage,
});

export default connect(select, mapDispatchToProps)(AddImageButton);
