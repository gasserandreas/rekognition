/* global React, shallow, mount, render, renderer, testSnapshot */

import AppMessage, { StyledAppMessage, StyledAppMessageContent } from '../AppMessage';

// test styling
it('AppMessage should render correctly', () => {
  testSnapshot(<AppMessage><p>Hello</p></AppMessage>);
});

it('AppMessage should be styled consistently', () => {
  testSnapshot(<StyledAppMessage />);
});

it('AppMessage content should be styled consistently', () => {
  testSnapshot(<StyledAppMessageContent />);
});

it('AppMessage content should be visible', () => {
  testSnapshot(<AppMessage show={true}><p>Hello</p></AppMessage>);
})

// unit tests
it('AppMessage content should show/hide on prop change', () => {
  const output = mount(<AppMessage><p>Hello</p></AppMessage>);
  expect(output);
  expect(output.props().show).toEqual(false);
  
  // check for content
  let content = output.find(StyledAppMessageContent);
  expect(content);
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
