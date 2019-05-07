import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { View, ViewHeading } from '../View';

it('View should render correctly', () => {
  const wrapper = shallow(<View>View Content</View>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('View should render with content', () => {
  const wrapper = shallow(
    <View>
      <h1>Hello</h1>
      <p>Some more content, yeaah.</p>
    </View>,
  );
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('view should pass additional props to component', () => {
  const props = {
    'data-attr-1': 1,
    'data-attr-2': 2,
    children: 'hello',
  };
  const output = shallow(<View {...props} />);

  const compProps = output.props();

  // check for props in compProps
  Object.keys(props).map((key) => {
    const value = props[key];
    expect(compProps[key]).toEqual(value);
  });
});

it('ViewHeading should render correctly', () => {
  const wrapper = shallow(<ViewHeading />);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('ViewHeading should render with content', () => {
  const wrapper = shallow(<ViewHeading>Heading</ViewHeading>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});
