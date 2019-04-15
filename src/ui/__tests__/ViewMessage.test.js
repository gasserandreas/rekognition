import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ViewMessage, { StyledViewMessage, StyledViewMessageContent } from '../ViewMessage';

// test styling
it('ViewMessage should render correctly', () => {
  const wrapper = shallow(<ViewMessage><p>Hello</p></ViewMessage>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('ViewMessage should be styled consistently', () => {
  const wrapper = shallow(<StyledViewMessage />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('ViewMessage content should be styled consistently', () => {
  const wrapper = shallow(<StyledViewMessageContent />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('ViewMessage content should be visible', () => {
  const wrapper = shallow(<ViewMessage show={true}><p>Hello</p></ViewMessage>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
})

// unit tests
it('ViewMessage content should show/hide on prop change', () => {
  const output = mount(<ViewMessage><p>Hello</p></ViewMessage>);
  expect(output).toBeTruthy();
  expect(output.props().show).toEqual(false);
  
  // check for content
  let content = output.find(StyledViewMessageContent);
  expect(content).toBeTruthy();
  expect(content.props().show).toEqual(false);

  // should be visible
  output.setProps({ show: true });
  expect(output.props().show).toEqual(true);
  content = output.find(StyledViewMessageContent);
  expect(content.props().show).toEqual(true);

  // should be hidden again
  output.setProps({ show: false });
  expect(output.props().show).toEqual(false);
  content = output.find(StyledViewMessageContent);
  expect(content.props().show).toEqual(false);
});
