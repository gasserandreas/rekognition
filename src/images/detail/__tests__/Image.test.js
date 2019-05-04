import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Image, { __testables__ } from '../Image';

const {
  StyledSelector,
  StyledAsyncImage,
  StyledImageWrapper,
  generateInitPos,
  getPositions,
} = __testables__;

 /**
     * Can't test handleResetForm hooks with Enzyme.
     * Waiting for Hooks support in Enzyme
     */
describe('Image test suite', () => {
  const mockedImage = {
    meta: {
      height: 100,
      width: 100,
      orientation: 'PORTRAIT',
    },
    path: 'your/image/test/path',
  };

  const initialProps = {
    image: mockedImage,
    selectedFace: {
      id: 'd4dd0b74-3e17-4835-840b-031d658dba04',
      position: {
        top: 1,
        left: 2,
        width: 3,
        height: 4,
      }
    },
    selectedLabel: {
      id: 'a5dd0b74-3e17-4835-840b-031d658dba09',
      instances: [{
        top: 1,
        left: 2,
        width: 3,
        height: 4,
      },
      {
        top: 11,
        left: 22,
        width: 33,
        height: 44,
      }],
    },
  };

  const getImage = (props) => mount(
    <Image 
      {...initialProps}
      {...props}
    />
  );

  it('should render', () => {
    const wrapper = getImage();
    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find('#jestSelectedFace').exists()).toBeTruthy();
    expect(wrapper.find('#jestSelectedLabel').exists()).toBeTruthy();
  });

  it('should render selected label instances', () => {
    const wrapper = getImage();
    expect(wrapper.exists()).toBeTruthy();

    const labelInstances = wrapper
      .find('#jestSelectedLabel')
      .find(StyledSelector);
    
    expect(labelInstances.length).toEqual(initialProps.selectedLabel.instances.length);

    labelInstances.forEach((instance, i) => {
      expect(instance.props().pos).toEqual(initialProps.selectedLabel.instances[i]);
    });
  });

  it('should not render selectedFace selector if not set', () => {
    const wrapper = getImage({
      selectedFace: null,
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('#jestSelectedFace').exists()).toBeFalsy();
  });

  it('should not render selectedLabel selector if not set', () => {
    const wrapper = getImage({
      selectedLabel: null,
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('#jestSelectedLabel').exists()).toBeFalsy();
  });

  it('should render ImageContainer consistently', () => {
    const wrapper = getImage();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render StyledImageWrapper consistently', () => {
    const wrapper = shallow(<StyledImageWrapper />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledSelector consistently', () => {
    const wrapper = shallow(<StyledSelector />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledAsyncImage consistently', () => {
    const wrapper = shallow(<StyledAsyncImage />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('generateInitPos should return init position', () => {
    expect(generateInitPos()).toEqual({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
  });

  describe('Faces: getPositions test suite', () => {
    describe('Faces: getPositions LANDSCAPE test suite', () => {
      const orientation = 'LANDSCAPE';
      const mockedMeta = {
        height: 900,
        width: 1200,
        orientation,
      };
      
      const mockedImageContainerPosition = {
        x: 350,
        y: 75,
        width: 600,
        height: 800,
        top: 75,
        bottom: 800,
      };

      it('should handle to big height', () => {
        const { imageContainerPosition, imageWrapperPosition } = getPositions(mockedMeta, mockedImageContainerPosition);
        expect(imageContainerPosition).toEqual({ x: 350, y: 75, width: 600, height: 800, top: 75, bottom: 800 });
        expect(imageWrapperPosition).toEqual({ top: 175, left: 0, width: 600, height: 450 });
      });

      it('should handle default', () => {
        const { imageContainerPosition, imageWrapperPosition } = getPositions({
          ...mockedMeta,
          height: 400,
        }, mockedImageContainerPosition);
        expect(imageContainerPosition).toEqual({ x: 350, y: 75, width: 600, height: 800, top: 75, bottom: 800 });
        expect(imageWrapperPosition).toEqual({ top: 300, left: 0, width: 600, height: 200 });
      });
    });

    describe('Faces: getPositions PORTRAIT test suite', () => {
      const orientation = 'PORTRAIT';
      const mockedMeta = {
        height: 5600,
        width: 4500,
        orientation,
      };
      
      const mockedImageContainerPosition = {
        x: 356,
        y: 73,
        width: 612,
        height: 73,
        top: 75,
        bottom: 898,
      };

      it('should handle to big height', () => {
        const { imageContainerPosition, imageWrapperPosition } = getPositions(mockedMeta, mockedImageContainerPosition);
        expect(imageContainerPosition).toEqual({ x: 356, y: 73, width: 612, height: 73, top: 75, bottom: 898 });
        expect(imageWrapperPosition).toEqual( { top: 0, left: 276.66964285714283, width: 58.66071428571429, height: 73 });
      });

      it('should handle default', () => {
        const { imageContainerPosition, imageWrapperPosition } = getPositions({
          ...mockedMeta,
          width: 400,
        }, {
          ...mockedImageContainerPosition,
          height: 5600,
        });
        expect(imageContainerPosition).toEqual({ x: 356, y: 73, width: 612, height: 5600, top: 75, bottom: 898 });
        expect(imageWrapperPosition).toEqual({ top: 0, left: 106, width: 400, height: 5600, });
      });
    });
  });
});
