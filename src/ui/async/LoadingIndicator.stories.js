import React from 'react';

import { storiesOf } from '@storybook/react';
import { color } from '@storybook/addon-knobs';

import LoadingIndicator from './LoadingIndicator';
import { Colors } from '../../styles';

import { baseName, sharedKnobs } from './async.stories';
  
storiesOf(`${baseName}/LoadingIndicator`, module)
  .add('default', () => (
    <LoadingIndicator
      size={sharedKnobs.getSize()}
      color={{
        light: color('Light color', Colors.Blue.Light),
        default: color('Default color', Colors.Blue.Default),
        dark: color('Dark color', Colors.Blue.Dark),
      }}
    />
  ));
