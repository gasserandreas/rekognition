import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button, { StyledButton, StyledLoading, BUTTON_TYPES, __testables__ } from '../Button';
import { Colors } from '../../../styles';

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

describe('color helper methods test suite', () => {
  const { getColor, getBackgroundColor, getBackgroundHoverColor } = __testables__;

  it('should handle getColor', () =>  {
    expect(getColor({ buttonStyle: BUTTON_TYPES.PRIMARY })).toEqual(Colors.ColorsPalette.White);
    expect(getColor({ buttonStyle: BUTTON_TYPES.ERROR })).toEqual(Colors.ColorsPalette.White);
    expect(getColor({ buttonStyle: BUTTON_TYPES.LINK })).toEqual(Colors.Blue.Default);
    expect(getColor({ buttonStyle: 'default' })).toEqual('#494949');
  });

  it('should handle getBackgroundColor', () => {
    expect(getBackgroundColor({ buttonStyle: BUTTON_TYPES.PRIMARY })).toEqual(Colors.Blue.Default);
    expect(getBackgroundColor({ buttonStyle: BUTTON_TYPES.WARNING })).toEqual(Colors.Orange.Default);
    expect(getBackgroundColor({ buttonStyle: BUTTON_TYPES.ERROR })).toEqual(Colors.Red.Default);
    expect(getBackgroundColor({ buttonStyle: BUTTON_TYPES.LINK })).toEqual('inherit');
    expect(getBackgroundColor({ buttonStyle: 'default' })).toEqual('rgba(9, 30, 66, 0.04)');
  });

  it('should handle getBackgroundHoverColor', () => {
    expect(getBackgroundHoverColor({ buttonStyle: BUTTON_TYPES.PRIMARY })).toEqual(Colors.Blue.Light);
    expect(getBackgroundHoverColor({ buttonStyle: BUTTON_TYPES.WARNING })).toEqual(Colors.Orange.Light);
    expect(getBackgroundHoverColor({ buttonStyle: BUTTON_TYPES.ERROR })).toEqual(Colors.Red.Light);
    expect(getBackgroundHoverColor({ buttonStyle: BUTTON_TYPES.LINK })).toEqual('inherit');
    expect(getBackgroundHoverColor({ buttonStyle: 'default' })).toEqual('rgba(9, 30, 66, 0.08)');
  });
});