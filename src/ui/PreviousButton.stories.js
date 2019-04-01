import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PreviousButton from './PreviousButton';

import styled from 'styled-components'
import { Colors } from '../styles';

const StyledBackground = styled.div`
  padding: 3rem 1rem;
  background-color: ${Colors.ColorsPalette.White};
`;

storiesOf('PreviousButton', module)
  .add('default', () => <StyledBackground>
    <PreviousButton
      onClick={action('on-click')}
    />
  </StyledBackground>);
