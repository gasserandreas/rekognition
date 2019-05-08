import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PreviousButton, { StyledPrevious } from '../PreviousButton';

// test styling
it('PreviousButton should render correctly', () => {
  const wrapper = shallow(<PreviousButton />);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('PreviousButton styles should be consistent', () => {
  const wrapper = shallow(<StyledPrevious />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
