import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import toJson from 'enzyme-to-json';

// setup enzyme
configure({ adapter: new Adapter() });

const testSnapshot = (component, props = {}) => {
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
};

const createComponentJson = (component) => {
  const wrapper = shallow(component);
  const comp = wrapper.dive();
  return toJson(comp);
};

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;
global.createComponentJson = createComponentJson;
global.React = React;

global.testSnapshot = testSnapshot;