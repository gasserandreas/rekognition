/* globals testUtils */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import ListView from '../ListView';
import ImageList from '../ImageList';
import AddImageButton from '../../AddImageButton';

import * as Paths from '../../../paths';

const { createMockStore } = testUtils;

describe('ListView test suite', () => {
  const initialProps = {
    history: {
      push: jest.fn(),
    },
    images: [],
    onImageClick: jest.fn(),
    addImageRequest: {
      error: null,
      loading: false,
    },
  };

  const mockStore = createMockStore();

  afterEach(() => {
    // clear mocks
    initialProps.history.push.mockClear();
    initialProps.onImageClick.mockClear();
  });

  const getListView = (props) => {
    const store = mockStore();
    const provider = mount(
      <Provider store={store}>
        <ListView {...initialProps} {...props} />
      </Provider>,
    );

    const wrapper = provider.find(ListView);
    return wrapper;
  };

  it('should render', () => {
    const wrapper = getListView();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render AddImageButton', () => {
    const wrapper = getListView();
    expect(wrapper.exists()).toBeTruthy();

    const addImageButton = wrapper.find(AddImageButton);
    expect(addImageButton.exists()).toBeTruthy();
  });

  it('should render ImageList with props', () => {
    const wrapper = getListView();
    expect(wrapper.exists()).toBeTruthy();

    const imageList = wrapper.find(ImageList);
    expect(imageList.exists()).toBeTruthy();

    const props = imageList.props();
    expect(props.images).toEqual(initialProps.images);
    expect(props.addImageRequest).toEqual(initialProps.addImageRequest);
  });

  it('should move to image detail view after image upload', () => {
    const imageId = '2a2bdf23-e73f-4a2a-913e-da29926a195c';
    const wrapper = getListView();
    expect(wrapper.exists()).toBeTruthy();

    const imageList = wrapper.find(ImageList);
    expect(imageList.exists()).toBeTruthy();

    expect(initialProps.history.push).not.toHaveBeenCalled();

    // fire event
    imageList.props().onImageClick({ id: imageId });

    expect(initialProps.history.push).toHaveBeenCalled();
    expect(initialProps.history.push).toHaveBeenCalledWith(Paths.GET_IMAGES_DETAIL(imageId));
  });
});
