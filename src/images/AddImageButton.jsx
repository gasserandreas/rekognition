import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import { Add } from 'grommet-icons';

import Button from '../ui/form/Button';

import { addImage } from '../redux/images';

import { Colors } from '../styles';

const StyledAddImageButton = styled(Button)`
  border-radius: 50%;
  width: 46px;
  height: 46px;
  position: fixed;
  right: 2.5rem;
  bottom: 2.5rem;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.20);
`;

class AddImageButton extends Component {
  uploadImage = this.uploadImage.bind(this);

  uploadImage(files) {
    // only supports single files
    if (files.length > 0) {
      const { addImage, afterOnClick } = this.props;
      files.forEach((file) => {
        const id = uuid.v4();
        addImage({ file, id });

        if (afterOnClick) {
          afterOnClick();
        }
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
              elevation="medium"
            />
          </span>
        )}
      </Dropzone>
    );
  }
}

AddImageButton.propTypes = {
  addImage: PropTypes.func.isRequired,
  afterOnClick: PropTypes.func,
}

AddImageButton.defaultProps = {
  afterOnClick: null,
}

// redux
const select = () => ({});

const mapDispatchToProps = ({
  addImage,
});

export default connect(select, mapDispatchToProps)(AddImageButton);
