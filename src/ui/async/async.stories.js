import { boolean, files, number } from '@storybook/addon-knobs';

export const baseName = 'Async';

export const sharedKnobs = {
  getLoading: () => boolean('Loading', true),
  getImage: () => files('Src (image)', 'image/*', []),
  getSize: () => number('Size', 100),
};
