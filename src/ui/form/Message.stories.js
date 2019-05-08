import React from 'react';

import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import Message, { MESSAGE_TYPES } from './Message';

const sharedKnobs = {
  getAppearance: () => select(
    'appearance',
    {
      INFO: MESSAGE_TYPES.INFO,
      ERROR: MESSAGE_TYPES.ERROR,
      WARNING: MESSAGE_TYPES.WARNING,
    },
    MESSAGE_TYPES.INFO,
  ),
  getBorder: () => boolean('border', false),
  getRounded: () => boolean('rounded', true),
};

storiesOf('Message', module).add('default', () => (
  <Message appearance={sharedKnobs.getAppearance()} border={sharedKnobs.getBorder()} rounded={sharedKnobs.getRounded()}>
    Hello world. There could be your styled message
  </Message>
));
