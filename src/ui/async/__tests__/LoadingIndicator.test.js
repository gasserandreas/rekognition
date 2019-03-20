/* global React, shallow, toJson */

import LoadingIndicator from '../LoadingIndicator';

const color = {
  light: '#36B37E',
  default: '#00875A',
  dark: '#006644',
};

it('should have consistent look & feel', () => {
  expect(toJson(shallow(<LoadingIndicator />).dive())).toMatchSnapshot();
});

it('should allow to specify different colors', () => {
  const wrapper = shallow(<LoadingIndicator color={color} />);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});
