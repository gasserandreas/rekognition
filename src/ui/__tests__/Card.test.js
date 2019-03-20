import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Card, { StyledCard } from '../Card';

// test styling
it('Card should render correctly', () => {
  const wrapper = shallow(<Card><p>Hello</p></Card>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Card styles should be consistent', () => {
  const wrapper = shallow(<StyledCard />);
  expect(toJson(wrapper)).toMatchSnapshot();
});