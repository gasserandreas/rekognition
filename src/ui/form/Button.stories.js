import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { select, boolean } from '@storybook/addon-knobs';

import Button, { BUTTON_TYPES } from './Button';

const sharedKnobs = {
  getButtonStyle: () => select('buttonStyle', {
    DEFAULT: 'default',
    PRIMARY: 'primary',
    WARNING: 'warning',
    ERROR: 'error',
    LINK: 'link',
  }, BUTTON_TYPES.DEFAULT),
  getLoading: (value = false) => boolean('loading', value),
};

storiesOf('Button', module)
  .add('default', () => (
    <Button
      onClick={action('onClick')}
      loading={sharedKnobs.getLoading()}
      buttonStyle={sharedKnobs.getButtonStyle()}
    >Click me</Button>
  ))
  .add('with loading indicator', () => (
    <Button
      onClick={action('onClick')}
      loading={sharedKnobs.getLoading(true)}
      buttonStyle={sharedKnobs.getButtonStyle()}
    >Click me</Button>
  ));
