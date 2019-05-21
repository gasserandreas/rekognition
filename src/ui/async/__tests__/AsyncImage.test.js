import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Image } from 'grommet';

import AsyncImage from '../AsyncImage';
import LoadingIndicator from '../LoadingIndicator';

it('AsyncImage should render correctly', () => {
  const wrapper = shallow(<AsyncImage src="" />);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Async image should shown with neverHideImg flag set', () => {
  const wrapper = shallow(<AsyncImage src="" neverHideImg />);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Async image should add additional styles if provided', () => {
  const wrapper = shallow(
    <AsyncImage
      src=""
      wrapperStyles="display: relative"
      neverHideImg
    />
  );
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('should show loading spinner while loading only', () => {
  const wrapper = mount(<AsyncImage src="" />);

  expect(wrapper.find(LoadingIndicator).length).toEqual(1);

  const image = wrapper.find(Image);
  expect(image);

  // simulate loaded img
  image.simulate('load');

  // no loading indicator
  expect(wrapper.find(LoadingIndicator).length).toEqual(0);
});

it('should callback onLoad after image on load', () => {
  const mockOnLoad = jest.fn();
  const wrapper = mount(<AsyncImage src="" onLoad={mockOnLoad} />);

  // check in timeout to wait initial img load
  setTimeout(() => {
    const counter = mockOnLoad.mock.calls.length;
    expect(counter).toEqual(1);

    // get image
    const image = wrapper.find(Image);
    expect(image);

    // simulate onLoad
    image.simulate('load');
    expect(mockOnLoad.mock.calls.length).toEqual(counter + 1);
  }, 100);
});
