import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import AddImageMessage, { __testables__ } from '../AddImageMessage';
import ViewMessage from '../../ui/ViewMessage';

const { StyledImage, StyledImageAttributes, StyledImageWrapper } = __testables__;

describe('AddImageMessage test suite', () => {
  const initialProps = {
    show: false,
    image: null,
    onHandleResetForm: jest.fn(),
    onHandleOpenImageDialog: jest.fn(),
  };

  const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUYPg/EwADQQHCL18ShQAAAABJRU5ErkJggg==';

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => '');
  });

  afterEach(() => {
    initialProps.onHandleResetForm.mockClear();
    initialProps.onHandleOpenImageDialog.mockClear();
  });

  const getAddImageMessage = props => mount(<AddImageMessage {...props} />);

  it('should render', () => {
    expect(getAddImageMessage(initialProps).exists()).toBeTruthy();
  });

  it('should pass show props to ViewMessage', () => {
    const wrapper = getAddImageMessage(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    const viewMessage = wrapper.find(ViewMessage);
    expect(viewMessage.exists()).toBeTruthy();
    expect(viewMessage.props().showMessage).toEqual(initialProps.shoMessage);
  });

  it('should render image wrapper if image set', () => {
    expect(global.URL.createObjectURL).not.toHaveBeenCalled();

    const image = {
      lastModified: 1556222830876,
      lastModifiedDate: new Date(),
      name: 'image-name',
      path: 'image-path',
      size: 123456789,
      type: 'image/jpeg',
    };

    // const image = {};

    const wrapper = getAddImageMessage({
      ...initialProps,
      image,
    });
    expect(wrapper.exists()).toBeTruthy();

    const styledImageWrapper = wrapper.find(StyledImageWrapper);
    expect(styledImageWrapper.exists()).toBeTruthy();

    // check styled image
    const styledImage = wrapper.find(StyledImage);
    expect(styledImage.exists()).toBeTruthy();
    expect(styledImage.props().src).toEqual('');

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(image);
  });

  describe('AddImageMessage appeareance test suite', () => {
    it('should render StyledImage consitently', () => {
      expect(toJson(mount(<StyledImage />))).toMatchSnapshot();
    });

    it('should render StyledImageAttributes consitently', () => {
      expect(toJson(mount(<StyledImageAttributes />))).toMatchSnapshot();
    });

    it('should render StyledImageWrapper consitently', () => {
      expect(toJson(mount(<StyledImageWrapper />))).toMatchSnapshot();
    });
  });
});
