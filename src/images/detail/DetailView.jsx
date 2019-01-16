import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading } from 'grommet';

import Labels from './Labels';
import Faces from './Faces';
import { Attribute } from './Attribute';

import View from '../../ui/View';
import AsyncImage from '../../ui/async/AsyncImage';
import AsyncContainer from '../../ui/async/AsyncContainer';

import { getImageCreationDateTime, getImageSrc } from '../util';
import { HOCRequestPropTypes } from '../../util/PropTypes';

import { Colors, MediaSize, Sizes } from '../../styles';

const StyledHeading = styled(Heading)`
  margin-bottom: 0.5rem;
`;

const StyledImageBox = styled(Box)`
  width: 100%;
  min-height: 30vh;
  justify-content: center;
  position: relative;

  @media (min-width: ${MediaSize.Tablet}) {
    padding-left: ${Sizes.LeftBar.width.Tablet};
  }

  @media (min-width: ${MediaSize.Notebook}) {
    padding-left: ${Sizes.LeftBar.width.Notebook};
  }

  @media (min-width: ${MediaSize.Desktop}) {
    padding-left: ${Sizes.LeftBar.width.Desktop};
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    padding-left: ${Sizes.LeftBar.width.Fullscreen};
  }
`;

const StyledDataBox = styled(Box)`
  width: 100%;
  background-color: ${Colors.ColorsPalette.White};

  @media (min-width: ${MediaSize.Tablet}) {
    position: fixed;
    top: ${Sizes.Header.height};
    left: 0;
    bottom: 0;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.20);
    z-index: 51;

    width: ${Sizes.LeftBar.width.Tablet};
  }

  @media (min-width: ${MediaSize.Notebook}) {
    width: ${Sizes.LeftBar.width.Notebook};
  }

  @media (min-width: ${MediaSize.Desktop}) {
    width: ${Sizes.LeftBar.width.Desktop};
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    width: ${Sizes.LeftBar.width.Fullscreen};
  }
`;

const StyledScrollableData = styled.div`
  @media (min-width: ${MediaSize.Tablet}) {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: .25rem 6px .25rem 0;
    margin: 0;
  }
`;

class DetailView extends Component {
  componentWillMount() {
    const { labels, faces, getImage, image: { id } } = this.props;

    // request labels and faces from backend
    if (labels.length === 0 && faces.length === 0) {
      getImage(id);
    }
  }

  render() {
    const { labels, faces, image, getImageRequest } = this.props;
    const { path, created, meta } = image;
    const { loading } = getImageRequest;

    // generate meta render array
    const { density, height, width, type, size } = meta;
    const metaValues = [
      {
        name: 'Type',
        value: type,
      },
      {
        name: 'Size',
        value: size > 0 ? `${(size / 1000000).toFixed(2)} MB` : null,
      },
      {
        name: 'Dimension',
        value: height > 0 ? `${width}px x ${height}px` : null,
      },
      {
        name: 'Density',
        value: density > 0 ? `${density} DPI` : null,
      },
    ].filter(({ value }) => value !== null);

    return (
      <View>
        <StyledImageBox fill>
          <Box pad="small" fill style={{ justifyContent: 'center' }}>
            <AsyncImage src={getImageSrc(path)} fit="contain" />
          </Box>
        </StyledImageBox>
        <StyledDataBox pad={{ vertical: 'none', horizontal: 'small' }}>
          <StyledScrollableData>
          <StyledHeading level="4">Image Information</StyledHeading>
            <Box>
              <Attribute attribute={{ name: 'Uploaded', value: getImageCreationDateTime(created) }} />
              {metaValues.map(({ name, value }) => (
                <Attribute key={`meta_attribute_${name}`} attribute={{ name, value }} />
              ))}
            </Box>
            <StyledHeading level="4">Labels ({labels.length})</StyledHeading>
            <AsyncContainer loading={loading}>
              <Labels
                labels={labels}
                onLabelClick={(label) => console.log(label)}
              />
            </AsyncContainer>
            <StyledHeading level="4">Faces ({faces.length})</StyledHeading>
            <AsyncContainer loading={loading}>
              <Faces
                faces={faces}
                onFaceClick={(face) => console.log(face)}
              />
            </AsyncContainer>
          </StyledScrollableData>
        </StyledDataBox>
      </View>
    );
  }
}

DetailView.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  faces: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getImageRequest: HOCRequestPropTypes.isRequired,
  getImage: PropTypes.func.isRequired,
}

DetailView.defaultProps = {

}

export default DetailView;

