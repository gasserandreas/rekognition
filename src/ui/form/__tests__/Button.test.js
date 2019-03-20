import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button, { StyledButton, StyledLoading } from '../Button';

it('Button should render correctly', () => {
  const wrapper = shallow(<Button>Click me</Button>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Button styles should be consistent', () => {
  const wrapper = shallow(<StyledButton />);
  expect(toJson(wrapper)).toMatchSnapshot();
})

it('Button should render primary styles', () => {
  const wrapper = shallow(<Button buttonStyle="primary">Click me</Button>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Button should render warning styles', () => {
  const wrapper = shallow(<Button buttonStyle="warning">Click me</Button>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Button should render error styles', () => {
  const wrapper = shallow(<Button buttonStyle="error">Click me</Button>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Button should render link styles', () => {
  const wrapper = shallow(<Button buttonStyle="link">Click me</Button>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

// Button loading styles
it('StyledLoading should render correctly', () => {
  const wrapper = shallow(<StyledLoading />);
  expect(toJson(wrapper)).toMatchSnapshot();
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
