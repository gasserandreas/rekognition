import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { Paragraph } from 'grommet';

import Image, { __testables__ } from '../Image';

const {
  StyledSelector,
  StyledAsyncImage,
  StyledImageWrapper,
  generateInitPos,
  getPositions,
} = __testables__;

describe('Faces test suite', () => {
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
  });
});
