import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import { Add } from 'grommet-icons';

import Button from '../ui/form/Button';

import { addImage } from '../redux/images';
import { addImageIsLoading } from '../redux/images/selectors';

import { Colors, MediaSize } from '../styles';

const StyledAddImageButton = styled(Button)`
  border-radius: 50%;
  width: 44px;
  height: 46px;
  position: fixed;
  right: 3rem;
  bottom: 2rem;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.20);
  z-index: 100;

  @media (min-width: ${MediaSize.Notebook}) {
    right: 2.5rem;
    bottom: 2.5rem;
  }
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
    const { loading, ...props } = this.props;
    return (
      <Dropzone
        onDrop={this.uploadImage}
        ref={(el) => { if (el) { this.uploadRef = el; }}}
      >{({getRootProps, getInputProps}) => (
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledAddImageButton
              {...props}
              type="button"
              icon={<Add color={Colors.ColorsPalette.White}/>}
              size="xlarge"
              buttonStyle="primary"
              elevation="medium"
              disabled={loading}
            />
          </span>
        )}
      </Dropzone>
    );
  }
}

AddImageButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  addImage: PropTypes.func.isRequired,
  afterOnClick: PropTypes.func,
}

AddImageButton.defaultProps = {
  afterOnClick: null,
}

// redux
const select = (state) => ({
  loading: addImageIsLoading(state),
});

const mapDispatchToProps = ({
  addImage,
});

export default connect(select, mapDispatchToProps)(AddImageButton);
