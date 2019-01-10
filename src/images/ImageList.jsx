import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Image } from 'grommet';

import { Colors, MediaSize } from '../styles';
import { getUrl } from '../util/services/networkUtils';

const ImagePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  created: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
});

const getImageSrc = path => `${getUrl('thumb')}/${path}`;

// image
const StyledImage = styled(Image)`
`;

const StyledImageContent = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
`;

// list item
const StyledListItem = styled(Box)`
  background-color: ${Colors.Neutrals.Dark};

  @media (min-width: ${MediaSize.Phone}) {
    &:hover {
      background-color: ${Colors.Neutrals.Dark};
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
`;

const ListItem = ({ image, ...props }) => {
  const { path, created } = image;
  return (
    <StyledListItem
      className="image-list-item"
      elevation="small"
      {...props}
    >
      <StyledImage src={getImageSrc(path)} fit="cover" />
      {/* <StyledImage src="" fit="cover" /> */}
      <StyledImageContent pad="small">
        Created: {new Date(created).getFullYear()}
      </StyledImageContent>
    </StyledListItem>
  );
}

ListItem.propTypes = {
  image: ImagePropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

// list
const getImageSizingStyles = expanded => expanded ? `
  @media (min-width: ${MediaSize.Tablet}) {
    display: block;
  }

  @media (min-width: ${MediaSize.Notebook}) and (max-width: ${MediaSize.Desktop}) {
    padding-right: 76vw;
  }

  @media (min-width: ${MediaSize.Desktop}) and (max-width: ${MediaSize.Fullscreen}) {
    padding-right: 79vw;
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    padding-right: 84vw;
  }
` : `
`;

const getImageListItemSizingStyles = expanded => expanded ? `
  @media (min-width: ${MediaSize.Notebook}) {
    margin: 1.5rem auto;
  }
` : `
  @media (min-width: ${MediaSize.Tablet}) and (max-width: ${MediaSize.Notebook}) {
    margin: 2vw 2vw;

    &:nth-child(3n + 0) {
      margin-right: 4vw;
    }
  
    &:nth-child(3n + 1) {
      margin-left: 4vw;
    }
  }

  @media (min-width: ${MediaSize.Notebook}) and (max-width: ${MediaSize.Desktop}) {
    margin: 2vw 2vw;

    &:nth-child(4n + 1) {
      margin-left: 4vw;
    }
  
    &:nth-child(4n + 0) {
      margin-right: 4vw;
    }
  }

  @media (min-width: ${MediaSize.Desktop}) and (max-width: ${MediaSize.Fullscreen}) {
    margin: 1.25vw 1.25vw;

    &:nth-child(5n + 1) {
      margin-left: 2.5vw;
    }
  
    &:nth-child(5n + 0) {
      margin-right: 2.5vw;
    }
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    margin: 2vw 2vw;

    &:nth-child(6n + 1) {
      margin-left: 4vw;
    }
  
    &:nth-child(6n + 0) {
      margin-right: 4vw;
    }
  }
`;

const StyledImageList = styled(Box)`
  padding: 0 0.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  transition: all 300ms;

  flex-direction: column;

  @media (min-width: ${MediaSize.Phone}) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
  }

  ${(props) => getImageSizingStyles(props.expanded)}

  // style image list item based on media queries
  .image-list-item {
    @media (max-width: ${MediaSize.Phone}) {
      width: 96vw;
      height: 96vw;
      margin: 0.5rem auto;
    }

    @media (min-width: ${MediaSize.Tablet}) and (max-width: ${MediaSize.Notebook}) {
      width: 28vw;
      height: 28vw;
    }

    @media (min-width: ${MediaSize.Notebook}) and (max-width: ${MediaSize.Desktop}) {
      width: 20vw;
      height: 20vw;
    }

    @media (min-width: ${MediaSize.Desktop}) and (max-width: ${MediaSize.Fullscreen}) {
      width: 17vw;
      height: 17vw;
    }

    @media (min-width: ${MediaSize.Fullscreen}) {
      width: 12vw;
      height: 12vw;
    }

    ${(props) => getImageListItemSizingStyles(props.expanded)}
  }
`;

const ImageList = ({ expanded, images, onImageClick }) => {
  return (
    <StyledImageList expanded={expanded} fill>
      {images.map((image) => {
        const { id } = image;
        const key = `image_list_item_${id}`;
        return (
          <ListItem
            key={key}
            image={image}
            onClick={() => onImageClick(image)}
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
