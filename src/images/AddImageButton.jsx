import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'

import { Box, Heading, Image } from 'grommet';
import { Add } from 'grommet-icons';

import Button from '../ui/form/Button';
import ButtonGroup from '../ui/form/ButtonGroup';
import AppMessage from '../ui/AppMessage';
import {
  getImageCreationDateTime,
  getFormattedFileSize,
} from '../util/util';

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

const StyledImageWrapper = styled(Box)`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 1rem 0;

  @media (min-width: ${MediaSize.Tablet}) {
    flex-direction: row;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  max-height: 40vw;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: inherit;
  margin-bottom: 1rem;

  @media (min-width: ${MediaSize.Tablet}) {
    width: 60%;
    height: auto;
    margin-right: 2rem;
    margin-bottom: 0 0 1rem;
  }
`;

const StyledImageAttributes = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: start;

  @media (min-width: ${MediaSize.Tablet}) {
    flex-direction: column;
    justify-content: flex-start;
  }

  div {
    box-sizing: border-box;
    flex-shrink: 1;
    flex-grow: 1;
    padding: 0.25rem;
    width: 49%;

    @media (min-width: ${MediaSize.Tablet}) {
      width: auto;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  strong {
    margin-right: 0.25rem;
  }
`;

const initialState = {
  showMessage: false,
  image: null,
};

const AddImageButton = ({
  loading,
  addImage,
  afterOnClick,
  ...props,
}) => {
  const [state, setState] = useState(initialState);
  const uploadRef = useRef();
  
  const handleResetForm = () => {
    setState({
      showMessage: false,
      image: null,
    });
  };

  const handleOpenImageDialog = () => {
    const dialog = uploadRef.current;

    if (dialog) {
      dialog.open();
    }
  }

  const handleUploadImage = (files) => {
    // only supports single files
    if (files.length > 0) {
      files.forEach((file) => {
        const { size } = file;
        if (size > 6000000) {
          // image is to big
          setState({
            showMessage: true,
            image: file,
          });
        } else {
          // upload
          const id = uuid.v4();
          addImage({ file, id });

          // reset form
          handleResetForm();

          if (afterOnClick) {
            afterOnClick();
          }
        }
      });
    }
  };

  const { showMessage, image } = state;
  return (
    <Fragment>
      <AppMessage show={showMessage}>
        <Heading level="2">Image is too big</Heading>
        <Box>
        <p>Hey it seems your image to big for being uploaded. We only allow uploading images up to <strong>6 MB</strong>, please choose a different image.</p>
          {image  && (
            <StyledImageWrapper>
              <StyledImage
                src={URL.createObjectURL(image)}
                fit="cover"
              />
              <StyledImageAttributes>
                <div>
                  <strong>Size: </strong>
                  <span style={{ color: Colors.Red.Default }}>{getFormattedFileSize(image.size)} MB</span>
                </div>
                <div><strong>Name: </strong>{image.name}</div>
                <div><strong>Created: </strong>{getImageCreationDateTime(image.lastModified)}</div>
                <div><strong>Type: </strong>{image.type}</div>
              </StyledImageAttributes>
            </StyledImageWrapper>
          )}
          <ButtonGroup>
            <Button
              type="button"
              buttonStyle="link"
              onClick={handleResetForm}
            >Cancel</Button>
            <Button
              type="button"
              buttonStyle="primary"
              style={{ marginLeft: '1rem' }}
              onClick={handleOpenImageDialog}
            >Change image</Button>
          </ButtonGroup>
        </Box>
      </AppMessage>
      <Dropzone
        onDrop={handleUploadImage}
        ref={uploadRef}
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
    </Fragment>
  );
};

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
