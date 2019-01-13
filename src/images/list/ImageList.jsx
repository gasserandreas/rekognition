import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Image } from 'grommet';
import {  } from 'grommet-icons';

import { Colors, MediaSize } from '../../styles';
import { getUrl } from '../../util/services/networkUtils';

const ImagePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  created: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
});

const getImageSrc = path => `${getUrl('thumb')}/${path}`;

// image attribute
const StyledImageAttr = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
  padding: 0.5rem 1rem;
`;

const ImageAttr = (props) => (
  <StyledImageAttr {...props} alignContent="between">
    <label>Created: </label>
    <span>
      Faces: 2
    </span>
  </StyledImageAttr>
)

// image
const StyledImage = styled(Image)``;

// list item
const StyledListItem = styled(Box)`
  margin: 0.5rem auto;
  background-color: #fff;
  color: ${Colors.ColorsPalette.Text};

  @media (min-width: ${MediaSize.Phone}) {
    &:hover {
      // background-color: ${Colors.Neutrals.Dark};
      cursor: pointer;

      img {
        opacity: .8;
      }
    }
  }

  @media (min-width: ${MediaSize.Phone}) and (max-width: ${MediaSize.Tablet}) {
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

  @media (min-width: ${MediaSize.Tablet}) and (max-width: ${MediaSize.Notebook}) {
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

  @media (min-width: ${MediaSize.Notebook}) and (max-width: ${MediaSize.Desktop}) {
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

  @media (min-width: ${MediaSize.Desktop}) and (max-width: ${MediaSize.Fullscreen}) {
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

  @media (min-width: ${MediaSize.Fullscreen}) {
    width: 12vw;
    height: 12vw;
    margin: 2vw 2vw;

    &:nth-child(6n + 1) {
      margin-left: 4vw;
    }
  
    &:nth-child(6n + 0) {
      margin-right: 4vw;
    }
  }
`;

const ListItem = ({ image, ...props }) => {
  const { path } = image;
  return (
    <StyledListItem {...props}>
      <StyledImage src={getImageSrc(path)} fit="cover" />
      <ImageAttr />
    </StyledListItem>
  );
}

ListItem.propTypes = {
  image: ImagePropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

// list
const StyledImageList = styled(Box)`
  padding: 0 0.5rem;

  @media (min-width: ${MediaSize.Phone}) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
  }
`;

const ImageList = (props) => {
  return (
    <StyledImageList fill>
      {props.images.map((image) => {
        const { id } = image;
        const key = `image_list_item_${id}`;
        return (
          <ListItem
            key={key}
            image={image}
            onClick={() => props.onImageClick(image)}
          />
        );
      })}
    </StyledImageList>
  );
};

ImageList.propTypes = {
  images: PropTypes.arrayOf(ImagePropType).isRequired,
  onImageClick: PropTypes.func.isRequired,
}


export default ImageList;
