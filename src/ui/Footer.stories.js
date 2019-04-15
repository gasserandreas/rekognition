import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';

import Footer from './Footer';

const StyledWrapper = styled.div`
  width: 100vw;
`;

storiesOf('Footer', module)
  .add('default', () => (
    <StyledWrapper>
      <Footer
        withSidebar={boolean('withSidebar', false)}
        alternativeColor={boolean('alternativeColor', false)}
      />
    </StyledWrapper>
  ))
  .add('with sidebar', () => (
    <StyledWrapper>
      <Footer
        withSidebar={boolean('withSidebar', true)}
        alternativeColor={boolean('alternativeColor', false)}
      />
    </StyledWrapper>
  ));

