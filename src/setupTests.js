import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

// setup enzyme
configure({ adapter: new Adapter() });

const testSnapshot = (component, props = {}) => {
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
};

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;

global.testSnapshot = testSnapshot;