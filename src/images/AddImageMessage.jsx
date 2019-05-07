import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Heading, Image } from 'grommet';

import Button from '../ui/form/Button';
import ButtonGroup from '../ui/form/ButtonGroup';
import ViewMessage from '../ui/ViewMessage';
import { getImageCreationDateTime, getFormattedFileSize } from '../util/util';

import { Colors, MediaSize } from '../styles';

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

const AddImageMessage = ({
  show, image, onHandleResetForm, onHandleOpenImageDialog,
}) => (
  <ViewMessage show={show}>
    <Heading level="2">Image is too big</Heading>
    <Box>
      <p>
        Hey it seems your image to big for being uploaded. We only allow uploading images up to
        <strong>6 MB</strong>
, please choose a different image.
      </p>
      {image && (
        <StyledImageWrapper>
          <StyledImage src={URL.createObjectURL(image)} fit="cover" />
          <StyledImageAttributes>
            <div>
              <strong>Size: </strong>
              <span style={{ color: Colors.Red.Default }}>
                {getFormattedFileSize(image.size)}
                {' '}
MB
              </span>
            </div>
            <div>
              <strong>Name: </strong>
              {image.name}
            </div>
            <div>
              <strong>Created: </strong>
              {getImageCreationDateTime(image.lastModified)}
            </div>
            <div>
              <strong>Type: </strong>
              {image.type}
            </div>
          </StyledImageAttributes>
        </StyledImageWrapper>
      )}
      <ButtonGroup>
        <Button type="button" buttonStyle="link" onClick={onHandleResetForm}>
          Cancel
        </Button>
        <Button type="button" buttonStyle="primary" style={{ marginLeft: '1rem' }} onClick={onHandleOpenImageDialog}>
          Change image
        </Button>
      </ButtonGroup>
    </Box>
  </ViewMessage>
);

AddImageMessage.propTypes = {
  show: PropTypes.bool.isRequired,
  image: PropTypes.shape({
    lastModified: PropTypes.number.isRequired,
    lastModifiedDate: PropTypes.shape({}),
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onHandleResetForm: PropTypes.func.isRequired,
  onHandleOpenImageDialog: PropTypes.func.isRequired,
};

AddImageMessage.defaultProps = {
  image: null,
};

export const __testables__ = {
  StyledImage,
  StyledImageAttributes,
  StyledImageWrapper,
};

export default AddImageMessage;
