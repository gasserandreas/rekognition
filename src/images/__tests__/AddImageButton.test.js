import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Dropzone from 'react-dropzone'

import { __testables__ } from '../AddImageButton';
import AddImageMessage from '../AddImageMessage';
import { addImage } from '../../redux/images';

const {
  select,
  mapDispatchToProps,
  AddImageButton,
  StyledAddImageButton,
  maxFileSize,
} = __testables__;

describe('AddImageButton test suite', () => {
  const initialProps = {
    loading: false,
    addImage: jest.fn(),
    afterOnClick: jest.fn(),
  };

  afterEach(() => {
    initialProps.addImage.mockClear();
    initialProps.afterOnClick.mockClear();
  });

  const getAddImageButton = (props) => mount(<AddImageButton {...props} />);

  describe('AddImageButton appeareance test suite', () => {
    it('should render StyledAddImageButton consitently', () => {
      expect(toJson(mount(<StyledAddImageButton />)))
        .toMatchSnapshot();
    });

    it('should render AddImageButton consitently', () => {
      expect(toJson(getAddImageButton(initialProps)))
        .toMatchSnapshot();
    });

    it('should render AddImageButton consitently while loading', () => {
      expect(toJson(getAddImageButton({
        ...initialProps,
        loading: true,
      })))
        .toMatchSnapshot();
    });
  });

  describe('AddImageButton component test suite', () => {
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUYPg/EwADQQHCL18ShQAAAABJRU5ErkJggg==';

    const getImageBlock = (imageString) => {
      const byteCharacters = atob(imageString);
      // byte values array creation
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // create blob
      return new Blob([byteArray], { type: 'image/png' });
    };

    it('should render', () => {
      const wrapper = getAddImageButton(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      // should include Dropzone and AddImageMessage
      const dropzone = wrapper.find(Dropzone);
      expect(dropzone.exists()).toBeTruthy();

      const addImageMessage = wrapper.find(AddImageMessage);
      expect(addImageMessage.exists()).toBeTruthy();
    });

    /**
     * Can't test handleResetForm hooks with Enzyme.
     * Waiting for Hooks support in Enzyme
     */
    // it('should handle handleResetForm', () => {
    //   const wrapper = getAddImageButton(initialProps);
      
    //   const state = {
    //     showMessage: true,
    //     image: {},
    //   };

    // });

    /**
     * Can't test handleResetForm hooks with Enzyme.
     * Waiting for Hooks support in Enzyme
     */
    // it('should handle handleOpenImageDialog', () => {
    //   const wrapper = getAddImageButton(initialProps);
    //   expect(wrapper.exists()).toBeTruthy();
    // });

    /**
     * Can't test handleResetForm hooks with Enzyme.
     * Waiting for Hooks support in Enzyme
     */
    // it('should handle handleUploadImage files', () => {
    //   const wrapper = getAddImageButton(initialProps);
    //   expect(wrapper.exists()).toBeTruthy();
    //   const dropzone = wrapper.find(Dropzone);
    //   expect(dropzone.exists()).toBeTruthy();
    // });

    it('should handle handleUploadImage for empty array', () => {
      const wrapper = getAddImageButton(initialProps);
      expect(wrapper.exists()).toBeTruthy();
      const dropzone = wrapper.find(Dropzone);
      expect(dropzone.exists()).toBeTruthy();

      dropzone.simulate('drop', []);

      expect(initialProps.addImage).not.toHaveBeenCalled();
      expect(initialProps.afterOnClick).not.toHaveBeenCalled();
    });

    it('should handle handleUploadImage for too large images', () => {
      const wrapper = getAddImageButton(initialProps);
      expect(wrapper.exists()).toBeTruthy();
      const dropzone = wrapper.find(Dropzone);
      expect(dropzone.exists()).toBeTruthy();

      dropzone.simulate('drop', [{
        size: maxFileSize + 1,
      }]);

      expect(initialProps.addImage).not.toHaveBeenCalled();
      expect(initialProps.afterOnClick).not.toHaveBeenCalled();
    });

    it('should not handle fire afterOnClick if not set', () => {
      const wrapper = getAddImageButton({
        ...initialProps,
        afterOnClick: () =>  {
          throw new Error('I should not have been thrown');
        },
      });
      expect(wrapper.exists()).toBeTruthy();

      // replace afterOnClick prop
      wrapper.setProps({ afterOnClick: undefined });

      // fire event
      wrapper.simulate('drop');

      expect(initialProps.addImage).not.toHaveBeenCalled();
    });
  });

  describe('AddImage connected redux implementation test suite', () => {
    it('should return container state', () => {
      const state = select({});
      expect(state).toEqual({
        loading: false,
      });
  
      expect(Object.keys(state)).toEqual([
        'loading',
      ]);
    });
  
    it('should return redux actions', () => {
      expect(mapDispatchToProps).toEqual({
        addImage,
      });
    });
  });
});
