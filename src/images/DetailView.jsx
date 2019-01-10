import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet';
import { Close } from 'grommet-icons';

import { Colors, MediaSize } from '../styles';

const StyledClose = styled(Close)`
  position: absolute;
  top: 1rem;
  left: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

// wrappers
const StyledDataWrapper = styled(Box)`
  background-color: #ddd;
  @media (min-width: ${MediaSize.Desktop}) {
    width: 45%;
  }
`;

const StyledImageWrapper = styled(Box)`
  background-color: #ccc;
  @media (min-width: ${MediaSize.Desktop}) {
    width: 55%;
  }
`;

// Detail view
const StyledDetailView = styled(Box)`
  background-color: ${Colors.ColorsPalette.White};
  opacity: 0;
  display: none;

  // handle show / hide in general
  ${({ visible }) => visible ? `
    opacity: 1;
    display: inherit;
  ` : ''}

  position: fixed;
  top: 3.5rem;
  right: 0;
  bottom: 0;
  left: 0;

  // define position based on screen size
  @media (min-width: ${MediaSize.Notebook}) {
    border-top: 1px solid #ccc;
  }

  @media (min-width: ${MediaSize.Notebook}) and (max-width: ${MediaSize.Desktop}) {
    left: 24vw;
  }

  @media (min-width: ${MediaSize.Desktop}) and (max-width: ${MediaSize.Fullscreen}) {
    left: 21vw;
  }

  @media (min-width: ${MediaSize.Fullscreen}) {
    left: 16vw;
  }

  // define content wrapping
  @media (min-width: ${MediaSize.Desktop}) {
    flex-direction: row-reverse;
  }
`;

const DetailView = (props) => {
  const { visible, onClickClose } = props;
  console.log(props);
  return (
    <StyledDetailView
      animation={{
        type: 'slideLeft',
        delay: 0,
        duration: 500,
        size: 'small',
      }}
      visible={visible}
      elevation="small"
    >
      <StyledClose onClick={onClickClose} />
      <StyledImageWrapper pad="small">
        Image
      </StyledImageWrapper>
      <StyledDataWrapper pad="small">
        Data
      </StyledDataWrapper>
    </StyledDetailView>
  )
}

export default DetailView;