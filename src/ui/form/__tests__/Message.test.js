import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Message, { MESSAGE_TYPES } from '../Message';

it('Message should render correctly', () => {
  const wrapper = shallow(<Message><p>Hello</p></Message>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Message should render info styles', () => {
  const wrapper = shallow(<Message appearance={MESSAGE_TYPES.INFO}><p>Hello</p></Message>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Message should render warning styles', () => {
  const wrapper = shallow(<Message appearance={MESSAGE_TYPES.WARNING}><p>Hello</p></Message>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Message should render error styles', () => {
  const wrapper = shallow(<Message appearance={MESSAGE_TYPES.ERROR}><p>Hello</p></Message>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Message should render without border', () => {
  const wrapper = shallow(<Message border><p>Hello</p></Message>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Message should render without round corners', () => {
  const wrapper = shallow(<Message rounded={false}><p>Hello</p></Message>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

