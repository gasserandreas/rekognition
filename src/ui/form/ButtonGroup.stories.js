import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ButtonGroup from './ButtonGroup';
import Button from './Button';

import { withDefaultMargin } from '../../../.storybook';

storiesOf('ButtonGroup', module)
  .addDecorator(withDefaultMargin())
  .add('default', () => (
    <ButtonGroup>
      <Button onClick={action('onClick')}>Click me</Button>
    </ButtonGroup>
  ));
