import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';

import AsyncContainer from './AsyncContainer';
import { Colors } from '../../styles';

import { baseName, sharedKnobs } from './async.stories';

const Styles = {
  Background: styled.div`
    background-color: ${Colors.ColorsPalette.White};
    padding: 3rem;
  `,
};

storiesOf(`${baseName}/AsyncContainer`, module).add('default', () => (
  <Styles.Background>
    <AsyncContainer loading={sharedKnobs.getLoading()}>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </p>
    </AsyncContainer>
  </Styles.Background>
));
