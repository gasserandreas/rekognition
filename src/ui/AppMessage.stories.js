import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import AppMessage from './AppMessage';

storiesOf('AppMessage', module)
  .add('default', () => (
    <AppMessage show={boolean('show', true)}>
      <h1>AppMessage Example</h1>
      <p>Add some text in here and...</p>
    </AppMessage>
  ));
