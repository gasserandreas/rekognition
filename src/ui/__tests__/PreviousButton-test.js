/* global React, shallow, mount, render, renderer, testSnapshot */

import PreviousButton, { StyledPrevious } from '../PreviousButton';

// test styling
it('PreviousButton should render correctly', () => {
  testSnapshot(<PreviousButton />);
});

it('PreviousButton styles should be consistent', () => {
  testSnapshot(<StyledPrevious />);
});