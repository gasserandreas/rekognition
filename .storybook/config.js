import React from 'react';
import { Theme } from '../src/styles';
import { Grommet } from 'grommet';

import { configure, addDecorator, addParameters } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addDecorator(withInfo({
  inline: false,
  header: true,
}));
addDecorator(centered)
addDecorator(withKnobs);
addDecorator(withA11y);

// grommet decorator
const withTheme = (cb) => (
  <React.Fragment>
    <Grommet theme={Theme} full={true}>
      {cb()}
    </Grommet>
  </React.Fragment>
);

addDecorator(withTheme);

// set global options
addParameters({
  options: {
    panelPosition: 'right',
  }
});

// setup viewport addon
const newViewports = {
  ...INITIAL_VIEWPORTS,
  // add your viewport configuration here
  /*
  yourDevice: {
    name: 'Visible viewport name',
    styles: {
      width: 'width in px',
      height: 'height in px',
    },
  },
  */
}
addParameters({ viewport: { viewports: newViewports } });

// load stories dynamically from src folder
const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
