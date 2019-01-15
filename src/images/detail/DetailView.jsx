import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { Box, Heading } from 'grommet';

import Labels from './Labels';
import Faces from './Faces';

import { Colors, MediaSize, Sizes } from '../../styles';
import { getUrl } from '../../util/services/networkUtils';

import { Attribute } from './Attribute';
import View from '../../ui/View';
import AsyncImage from '../../ui/AsyncImage';
import LoadingIndicator from '../../ui/LoadingIndicator';

import { HOCRequestPropTypes } from '../../util/PropTypes';

const getImageSrc = path => `${getUrl('thumb')}/${path}`;
const getImageCreatedDate = dateStr => {
  const format = 'D MMM YYYY - HH:MM:SS';
  return moment(dateStr).format(format);
}

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
  // background-color: ${Colors.Neutrals.Light};
  background-color: ${Colors.ColorsPalette.White};

  @media (min-width: ${MediaSize.Tablet}) {
    position: fixed;
    top: ${Sizes.Header.height};
    left: 0;
    bottom: 0;
    // background-color: ${Colors.Neutrals.Light};
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
        value: size > 0 ? size : null,
      },
      {
        name: 'Dimension',
        value: height > 0 ? `${width}px x ${height}` : null,
      },
      {
        name: 'Density',
        value: density > 0 ? density : null,
      },
    ].filter(({ value }) => value !== null);

    console.log(this.props);
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
              <Attribute attribute={{ name: 'Uploaded', value: getImageCreatedDate(created) }} />
              {metaValues.map(({ name, value }) => (
                <Attribute key={`meta_attribute_${name}`} attribute={{ name, value }} />
              ))}
            </Box>
            <StyledHeading level="4">Labels ({labels.length})</StyledHeading>
            { loading ? (
              <LoadingIndicator />
            ) : (
              <Labels
                labels={labels}
                onLabelClick={(label) => console.log(label)}
              />
            )}
            <StyledHeading level="4">Faces ({faces.length})</StyledHeading>
            { loading ? (
              <LoadingIndicator />
            ) : (
              <Faces
                faces={faces}
                onFaceClick={(face) => console.log(face)}
              />
            )}
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

