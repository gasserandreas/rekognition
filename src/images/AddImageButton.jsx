import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

import { Add } from 'grommet-icons';

import AddImageMessage from './AddImageMessage';

import Button from '../ui/form/Button';

import * as reduxImages from '../redux/images';
import { addImageIsLoading } from '../redux/images/selectors';

import { Colors, MediaSize } from '../styles';

const maxFileSize = 6000000;

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

const initialState = {
  showMessage: false,
  image: null,
};

const AddImageButton = ({
  loading,
  addImage,
  afterOnClick,
  ...props
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
  };

  /* instanbul ignore-next */
  const handleUploadImage = (files) => {
    /* instanbul ignore-next */
    if (files.length > 0) {
      /* instanbul ignore-next */
      files.forEach((file) => {
        const { size } = file;
        if (size > maxFileSize) {
          // image is to big
          setState({
            showMessage: true,
            image: file,
          });
        } else {
          // upload
          /* instanbul ignore-next */
          const id = uuid.v4();
          /* instanbul ignore-next */
          addImage({ file, id });

          // reset form
          /* instanbul ignore-next */
          handleResetForm();

          /* instanbul ignore-next */
          if (afterOnClick) {
            /* instanbul ignore-next */
            afterOnClick();
          }
        }
      });
    }
  };

  const { showMessage, image } = state;
  return (
    <Fragment>
      <AddImageMessage
        show={showMessage}
        image={image}
        onHandleResetForm={handleResetForm}
        onHandleOpenImageDialog={handleOpenImageDialog}
      />
      <Dropzone
        onDrop={handleUploadImage}
        ref={uploadRef}
      >
        {({ getRootProps, getInputProps }) => (
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <StyledAddImageButton
              {...props}
              type="button"
              icon={<Add color={Colors.ColorsPalette.White} />}
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
};

AddImageButton.defaultProps = {
  afterOnClick: null,
};

// redux
const select = state => ({
  loading: addImageIsLoading(state),
});

const mapDispatchToProps = ({
  addImage: reduxImages.addImage,
});

export const __testables__ = {
  select,
  mapDispatchToProps,
  AddImageButton,
  StyledAddImageButton,
  maxFileSize,
};

export default connect(select, mapDispatchToProps)(AddImageButton);
