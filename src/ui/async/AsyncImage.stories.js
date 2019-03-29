import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import AsyncImage from './AsyncImage';

import { baseName, sharedKnobs } from './async.stories';

storiesOf(`${baseName}/AsyncImage`, module)
  .add('default', () => (
    <AsyncImage
      src={sharedKnobs.getImage()[0]}
      onLoad={action('onLoad')}
    />
  ))
  .add('with never hide img enabled', () => (
    <AsyncImage
      src={sharedKnobs.getImage()[0]}
      onLoad={action('onLoad')}
      neverHideImg={boolean('neverHideImg', true)}
    />
  ));
