/* global React, shallow, mount, render, renderer, testSnapshot */

import Button, { StyledButton, StyledLoading } from '../Button';

it('Button should render correctly', () => {
  testSnapshot(<Button>Click me</Button>);
});

it('Button styles should be consistent', () => {
  testSnapshot(<StyledButton />);
})

it('Button should render primary styles', () => {
  testSnapshot(<Button buttonStyle="primary">Click me</Button>);
});

it('Button should render warning styles', () => {
  testSnapshot(<Button buttonStyle="warning">Click me</Button>);
});

it('Button should render error styles', () => {
  testSnapshot(<Button buttonStyle="error">Click me</Button>);
});

it('Button should render link styles', () => {
  testSnapshot(<Button buttonStyle="link">Click me</Button>);
});

// Button loading styles
it('StyledLoading should render correctly', () => {
  testSnapshot(<StyledLoading />);
});

// basic tests
it('Button should render loading component if loading is true', () => {
  const output = mount(<Button />);

  // render without loading
  expect(output.props().loading).toEqual(false);
  expect(output.find(StyledLoading).length).toEqual(0);

  // enable loading
  output.setProps({ loading: true });
  expect(output.props().loading).toEqual(true);
  expect(output.find(StyledLoading).length).toEqual(1);

  // disable loading again
  output.setProps({ loading: false });
  expect(output.props().loading).toEqual(false);
  expect(output.find(StyledLoading).length).toEqual(0);
});
