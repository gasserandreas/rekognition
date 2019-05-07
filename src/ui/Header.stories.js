import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { withRouter } from '../../.storybook';

import Header from './Header';

storiesOf('Header', module)
  .addDecorator(withRouter())
  .add('default', () => (
    <Header
      isAuthenticated={boolean('isAuthenticated', true)}
      username={text('username', 'Andreas G.')}
      showPreviousButton={boolean('showPreviousButton', false)}
      onGoToPrevious={action('onGoToPrevious')}
    />
  ))
  .add('is authenticated', () => (
    <Header isAuthenticated username="Andreas G." showPreviousButton onGoToPrevious={action('onGoToPrevious')} />
  ))
  .add('is not authenticated', () => (
    <Header isAuthenticated={false} showPreviousButton onGoToPrevious={action('onGoToPrevious')} />
  ));
