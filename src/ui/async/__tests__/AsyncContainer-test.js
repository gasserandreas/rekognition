/* global React, shallow, toJson */

import AsyncContainer from '../AsyncContainer';

const getShallowAsyncContainer = (loading = false) => {
  const props = {
    loading,
    children: <p>children</p>,
  };
  const wrapper = shallow(<AsyncContainer {...props} />);
  return wrapper;
};

it('should render with consistent look & feel', () => {
  expect(toJson(getShallowAsyncContainer().dive())).toMatchSnapshot();
});

it('should render loading indicator while loading', () => {
  expect(toJson(getShallowAsyncContainer(true).dive())).toMatchSnapshot();
});
