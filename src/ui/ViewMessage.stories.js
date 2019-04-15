import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import ViewMessage from './ViewMessage';

storiesOf('ViewMessage', module)
  .add('default', () => (
    <ViewMessage show={boolean('show', true)}>
      <h1>ViewMessage Example</h1>
      <p>Add some text in here and...</p>
    </ViewMessage>
  ));
