import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import listImages from '../__data__/listImages.json';

import ImageList, { __testables__ } from '../ImageList';

describe('ImageList test suite', () => {
  const initialProps = {
    history: {
      push: jest.fn(),
    },
    images: listImages,
    addImageRequest: {
      loading: false,
      error: null,
    },
    onImageClick: jest.fn(),
  };

  const getImageList = (props) => mount(
    <ImageList
      {...initialProps}
      {...props}
    />
  );

  afterEach(() => {
    initialProps.history.push.mockClear();
    initialProps.onImageClick.mockClear();
  });

  it('should render', () => {
    const wrapper = getImageList();
    expect(wrapper.exists()).toBeTruthy();
  });
});
