import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';

import ImageList from './ImageList';
import DetailView from './DetailView';

const StyledImageView = styled(Box)`
  overflow-x: scroll;
`;

class ImageView extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  state = {
    expanded: true,
  }

  render() {
    const { images } = this.props;
    const { expanded } = this.state;
    return (
      <StyledImageView
        fill
      >
        <ImageList
          expanded={expanded}
          images={images}
          onImageClick={image => this.setState({ expanded: !expanded })}
        />
        <DetailView
          visible={expanded}
          onClickClose={() => this.setState({ expanded: !expanded })}
        />
      </StyledImageView>
    )
  }
}

export default ImageView;
