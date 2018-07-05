import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

const req = require.context('../src/stories', true, /\.stories\.js$/);

setOptions({
  name: 'AWS Rekognition Stoorybook',
  addonPanelInRight: true,
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
