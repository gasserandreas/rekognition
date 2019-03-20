/* global it, React, shallow, mount, render, renderer, testSnapshot */

import Message, { MESSAGE_TYPES } from '../Message';

it('Message should render correctly', () => {
  testSnapshot(<Message><p>Hello</p></Message>);
});

it('Message should render info styles', () => {
  testSnapshot(<Message appearance={MESSAGE_TYPES.INFO}><p>Hello</p></Message>);
});

it('Message should render warning styles', () => {
  testSnapshot(<Message appearance={MESSAGE_TYPES.WARNING}><p>Hello</p></Message>);
});

it('Message should render error styles', () => {
  testSnapshot(<Message appearance={MESSAGE_TYPES.ERROR}><p>Hello</p></Message>);
});

it('Message should render without border', () => {
  testSnapshot(<Message border><p>Hello</p></Message>);
});

it('Message should render without round corners', () => {
  testSnapshot(<Message rounded={false}><p>Hello</p></Message>);
});

