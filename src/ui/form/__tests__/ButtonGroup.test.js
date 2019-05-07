import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ButtonGroup from '../ButtonGroup';

it('ButtonGroup should render correctly', () => {
  const wrapper = shallow(
    <ButtonGroup>
      <button>Click me</button>
    </ButtonGroup>,
  );
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});
