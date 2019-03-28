import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from './Card';

storiesOf('Card', module)
  .add('default', () => (
    <Card>
      <h1>Card Example</h1>
      <p>Add some text in here and...</p>
    </Card>
  ));
