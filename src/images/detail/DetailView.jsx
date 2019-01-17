import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading } from 'grommet';

import Labels from './Labels';
import Faces from './Faces';
import { Attribute } from './Attribute';
import Image from './Image';
import AddImageButton from '../AddImageButton';

import PreviousButton from '../../ui/PreviousButton';
import View from '../../ui/View';
import AsyncContainer from '../../ui/async/AsyncContainer';

import { getImageCreationDateTime } from '../util';
import { HOCRequestPropTypes } from '../../util/PropTypes';

import * as Paths from '../../paths';
import { Colors, MediaSize, Sizes } from '../../styles';

const StyledBackButton = styled(PreviousButton)`
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  @media (max-width: ${MediaSize.Tablet}) {
    display: none;
    visibility: none;
  }
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 0.5rem;
`;

const StyledImageBoxContainer = styled.div`
  width: 96%;
  height: 96%;
  margin: 2%;
  position: relative;
`;

const StyledImageBox = styled(Box)`
  width: 100%;
  justify-content: center;
  position: fixed;

  @media (max-width: ${MediaSize.Tablet}) {
    height: 320px;
    left: 0;
  }

  @media (min-width: ${MediaSize.Tablet}) {
    top: ${Sizes.Header.height};
    right: 0;
    bottom: 0;
    left: ${Sizes.LeftBar.width.Tablet};
    width: auto;
    height: auto;
  }

  @media (min-width: ${MediaSize.Notebook}) {
    left: ${Sizes.LeftBar.width.Notebook};
  }

  @media (min-width: ${MediaSize.Desktop}) {
    left: ${Sizes.LeftBar.width.Desktop};
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    left: ${Sizes.LeftBar.width.Fullscreen};
  }
`;

const StyledDataBox = styled(Box)`
  width: 100%;
  background-color: ${Colors.ColorsPalette.White};
  position: fixed;
  left: 0;
  bottom: 0;

  @media (max-width: ${MediaSize.Tablet}) {
    top: ${Sizes.Header.number + 320}px;
  }

  @media (min-width: ${MediaSize.Tablet}) {
    top: ${Sizes.Header.height};
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
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: .25rem 6px .25rem 0;
  margin: 0;
`;

const StyledView = styled(View)`
  @media (max-width: ${MediaSize.Tablet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

class DetailView extends Component {
  handleFaceClick = this.handleFaceClick.bind(this);
  handleLabelClick = this.handleLabelClick.bind(this);

  componentWillMount() {
    const { labels, faces, getImage, image: { id } } = this.props;

    // request labels and faces from backend
    if (labels.length === 0 && faces.length === 0) {
      getImage(id);
    }
  }

  handleFaceClick(face) {
    const { id } = face;
    this.setBrowserParams({ key: 'face', value: id });
  } 

  handleLabelClick(label) {
    const { id } = label;
    this.setBrowserParams({ key: 'label', value: id });
  }

  setBrowserParams(params) {
    const { image, history } = this.props;
    const { id } = image;
    const { key, value } = params;

    const path = `${Paths.GET_IMAGES_DETAIL(id)}?${key}=${value}`;
    history.push(path);
  }

  render() {
    const {
      history,
      labels,
      selectedLabel,
      faces,
      selectedFace,
      image,
      getImageRequest,
    } = this.props;

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
      <StyledView>
        <AddImageButton afterOnClick={() => history.push(Paths.HOME)} />
        <StyledImageBox fill>
          <StyledImageBoxContainer>
            <Image
              image={image}
              selectedLabel={selectedLabel}
              selectedFace={selectedFace}
            />
          </StyledImageBoxContainer>
        </StyledImageBox>
        <StyledDataBox pad={{ vertical: 'none', horizontal: 'small' }}>
          <StyledBackButton onClick={() => history.push(Paths.HOME)} />
          <StyledScrollableData>
          <StyledHeading level="4" style={{ marginTop: '0rem'}}>Image Information</StyledHeading>
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
                selectedLabel={selectedLabel}
                onLabelClick={(label) => this.handleLabelClick(label)}
              />
            </AsyncContainer>
            { faces.length > 0 && (
              <Fragment>
                <StyledHeading level="4">Faces ({faces.length})</StyledHeading>
                <AsyncContainer loading={loading}>
                  <Faces
                    faces={faces}
                    selectedFace={selectedFace}
                    onFaceClick={(face) => this.handleFaceClick(face)}
                  />
                </AsyncContainer>
              </Fragment>
            )}
          </StyledScrollableData>
        </StyledDataBox>
      </StyledView>
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
  selectedLabel: PropTypes.shape({}),
  faces: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedFace: PropTypes.shape({}),
  getImageRequest: HOCRequestPropTypes.isRequired,
  getImage: PropTypes.func.isRequired,
}

DetailView.defaultProps = {
  selectedFace: null,
  selectedLabel: null,
}

export default DetailView;

