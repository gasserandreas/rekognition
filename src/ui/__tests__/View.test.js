/* global React, shallow, mount, render, renderer, testSnapshot */

import { View, ViewHeading } from '../View';

const getShallowView = (props = { children: 'content' }) => shallow(<View {...props} />);

it('View should render correctly', () => {
  testSnapshot(<View>View Content</View>);
});

it('View should render with content', () => {
  testSnapshot(<View>
    <h1>Hello</h1>
    <p>Some more content, yeaah.</p>
  </View>);
});

it('view should pass additional props to component', () => {
  const props = {
    'data-attr-1': 1,
    'data-attr-2': 2,
    children: 'hello',
  };
  const output = getShallowView(props);

  const compProps = output.props();

  // check for props in compProps
  Object.keys(props)
    .map((key) => {
      const value = props[key];
      expect(compProps[key]).toEqual(value);
    });
});

it('ViewHeading should render correctly', () => {
  testSnapshot(<ViewHeading />);
});

it('ViewHeading should render with content', () => {
  testSnapshot(<ViewHeading>Heading</ViewHeading>);
});
