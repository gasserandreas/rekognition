/* global React, shallow, mount, render, renderer, testSnapshot */

import Card, { StyledCard } from '../Card';

// test styling
it('Card should render correctly', () => {
  testSnapshot(<Card><p>Hello</p></Card>);
});

it('Card styles should be consistent', () => {
  testSnapshot(<StyledCard />);
});