import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'

import Button from '../ui/Button';
import { Add } from 'grommet-icons';

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
    if (files.length > 0) {
      console.log('uploadImage');
      console.log(files);
      // const id = uuid.v4();
      // this.props.postImage(id, files[0]);

      // // go to detail page
      // const url = `${Paths.GET_IMAGES_DETAILS(id)}`;
      // this.props.history.push(url);
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

export default AddImageButton;
