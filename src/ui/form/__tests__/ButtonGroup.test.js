/* global React, shallow, mount, render, renderer, testSnapshot */

import ButtonGroup from '../ButtonGroup';

it('ButtonGroup should render correctly', () => {
  testSnapshot(<ButtonGroup><button>Click me</button></ButtonGroup>);
});

