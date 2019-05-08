import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';
import { Clock, Group, Tag } from 'grommet-icons';

import AsyncImage from '../../ui/async/AsyncImage';
import LoadingIndicator from '../../ui/async/LoadingIndicator';

import { getThumbImageSrc, getDefaultFormatedDate } from '../../util/util';
import { HOCRequestPropTypes, ImagePropType } from '../../util/PropTypes';
import { Colors, MediaSize } from '../../styles';

// image attribute
const StyledImageAttr = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
  padding: 0.75rem 0.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: flex-end;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    label {
      color: ${Colors.ColorsPalette.TextFaded};
    }

    svg {
      fill: ${Colors.ColorsPalette.TextFaded};
      stroke: ${Colors.ColorsPalette.TextFaded};
    }
  }

  svg {
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 0.2rem;
    margin-top: 0.1rem;
    cursor: pointer;
  }

  span {
    display: flex;
    flex-flow: row;
    flex-wrap: 0;
    align-items: stretch;
  }
`;

const ImageAttr = ({
  created, numberOfFaces, numberOfLabels, ...props
}) => (
  <StyledImageAttr direction="row" {...props}>
    <Box align="center">
      <span id="jestDateTimeLabel">
        <Clock />
        {getDefaultFormatedDate(created)}
      </span>
    </Box>
    <Box align="center" alignContent="between" direction="row">
      <span style={{ marginRight: '0.5rem' }}>
        <Group />
        {numberOfFaces}
      </span>
      <span>
        <Tag />
        {numberOfLabels}
      </span>
    </Box>
  </StyledImageAttr>
);

ImageAttr.propTypes = {
  created: PropTypes.string.isRequired,
  numberOfFaces: PropTypes.number.isRequired,
  numberOfLabels: PropTypes.number.isRequired,
};

// image
const StyledImage = styled(AsyncImage)`
  flex-shrink: 1;
  flex-grow: 1;
`;

// list item
const StyledListItem = styled(Box)`
  margin: 0.5rem auto;
  background-color: #fff;
  color: ${Colors.ColorsPalette.Text};
  flex-direction: column-reverse;

  width: 90vw;
  height: 80vw;

  @media (min-width: ${MediaSize.Phone}) {
    &:hover {
      // background-color: ${Colors.Neutrals.Dark};
      cursor: pointer;

      img {
        opacity: .8;
      }
    }
  }

  @media (min-width: ${MediaSize.Tablet}) and (max-width: ${MediaSize.Notebook}) {
    width: 38vw;
    height: 38vw;
    margin: 4vw 8vw;

    &:nth-child(2n + 1) {
      margin-right: 4vw;
    }

    &:nth-child(2n + 0) {
      margin-left: 4vw;
    }
  }

  @media (min-width: ${MediaSize.Notebook}) and (max-width: ${MediaSize.Desktop}) {
    width: 28vw;
    height: 28vw;
    margin: 2vw 2vw;

    &:nth-child(3n + 0) {
      margin-right: 4vw;
    }
  
    &:nth-child(3n + 1) {
      margin-left: 4vw;
    }
  }

  @media (min-width: ${MediaSize.Desktop}) and (max-width: ${MediaSize.Fullscreen}) {
    width: 20vw;
    height: 20vw;
    margin: 2vw 2vw;

    &:nth-child(4n + 1) {
      margin-left: 4vw;
    }
  
    &:nth-child(4n + 0) {
      margin-right: 4vw;
    }
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    width: 17vw;
    height: 17vw;
    margin: 1.25vw 1.25vw;

    &:nth-child(5n + 1) {
      margin-left: 2.5vw;
    }
  
    &:nth-child(5n + 0) {
      margin-right: 2.5vw;
    }
  }
`;

const ListItem = ({ image, ...props }) => {
  const { path, created, meta } = image;
  const { numberOfFaces, numberOfLabels } = meta;
  return (
    <StyledListItem {...props}>
      <ImageAttr created={created} numberOfFaces={numberOfFaces} numberOfLabels={numberOfLabels} />
      <StyledImage src={getThumbImageSrc(path)} fit="cover" />
    </StyledListItem>
  );
};

const ListItemAdd = props => (
  <StyledListItem {...props} style={{ justifyContent: 'center' }}>
    <StyledImageAttr />
    <LoadingIndicator />
  </StyledListItem>
);

ListItem.propTypes = {
  image: ImagePropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

// list
const StyledImageList = styled(Box)`
  padding: 0 0.5rem;

  @media (min-width: ${MediaSize.Tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0;
  }
`;

const ImageList = (props) => {
  const { images, addImageRequest, onImageClick } = props;
  return (
    <StyledImageList fill>
      {addImageRequest.loading && <ListItemAdd />}
      {images.map((image) => {
        const { id } = image;
        const key = `image_list_item_${id}`;
        return <ListItem key={key} image={image} onClick={() => onImageClick(image)} elevation="xsmall" />;
      })}
    </StyledImageList>
  );
};

ImageList.propTypes = {
  images: PropTypes.arrayOf(ImagePropType).isRequired,
  addImageRequest: HOCRequestPropTypes.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export const __testables__ = {
  StyledImageAttr,
  ImageAttr,
  StyledImage,
  StyledListItem,
  ListItem,
  ListItemAdd,
  StyledImageList,
};

export default ImageList;
