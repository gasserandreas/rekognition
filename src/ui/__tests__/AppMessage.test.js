import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import AppMessage, { StyledAppMessage, StyledAppMessageContent } from '../AppMessage';

// test styling
it('AppMessage should render correctly', () => {
  const wrapper = shallow(<AppMessage><p>Hello</p></AppMessage>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('AppMessage should be styled consistently', () => {
  const wrapper = shallow(<StyledAppMessage />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('AppMessage content should be styled consistently', () => {
  const wrapper = shallow(<StyledAppMessageContent />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('AppMessage content should be visible', () => {
  const wrapper = shallow(<AppMessage show={true}><p>Hello</p></AppMessage>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
})

// unit tests
it('AppMessage content should show/hide on prop change', () => {
  const output = mount(<AppMessage><p>Hello</p></AppMessage>);
  expect(output).toBeTruthy();
  expect(output.props().show).toEqual(false);
  
  // check for content
  let content = output.find(StyledAppMessageContent);
  expect(content).toBeTruthy();
  expect(content.props().show).toEqual(false);

  // should be visible
  output.setProps({ show: true });
  expect(output.props().show).toEqual(true);
  content = output.find(StyledAppMessageContent);
  expect(content.props().show).toEqual(true);

  // should be hidden again
  output.setProps({ show: false });
  expect(output.props().show).toEqual(false);
  content = output.find(StyledAppMessageContent);
  expect(content.props().show).toEqual(false);
});
