import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Heading } from 'grommet';

import DetailTopBar from './DetailTopBar';

import { Colors, MediaSize, Sizes } from '../../styles';
import View from '../../ui/View';

const StyledHeading = styled(Heading)`
  margin-top: 0;
`;

const StyledImageBox = styled(Box)`
  width: 100%;
  position: relative;
`;

const StyledDataBox = styled(Box)`
  width: 100%;
  background-color: ${Colors.Neutrals.Light};

  @media (min-width: ${MediaSize.Tablet}) {
    position: fixed;
    top: ${Sizes.Header.number + Sizes.TopBar.number}px;
    left: 0;
    bottom: 0;
    background-color: ${Colors.Neutrals.Light};
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

class DetailView extends Component {
  componentWillMount() {
    const { labels, faces, getImage, image: { id } } = this.props;

    // request labels and faces from backend
    if (labels.length === 0 && faces.length === 0) {
      getImage(id);
    }
  }

  render() {
    console.log(this.props);
    return (
      <View
        topBar={<DetailTopBar onGoBackClick={this.props.history.goBack} />}
      >
        <StyledImageBox>
          Image
        </StyledImageBox>
        <StyledDataBox pad="small">
          <StyledHeading level="4">Image Properties</StyledHeading>
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
  getImage: PropTypes.func.isRequired,
}

DetailView.defaultProps = {

}

export default DetailView;

