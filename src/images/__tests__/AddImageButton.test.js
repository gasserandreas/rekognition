import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { __testables__ } from '../AddImageButton';

const {
  select,
  mapDispatchToProps,
  AddImageButton,
  StyledAddImageButton,
  StyledImage,
  StyledImageAttributes,
  StyledImageWrapper,
} = __testables__;

it('dummy', () => {
  expect(true);
});

// describe('AddImageButton test suite', () => {
//   const initialProps = {
//     loading: false,
//     addImage: jest.fn(),
//     afterOnClick: jest.fn(),
//   };

//   afterEach(() => {
//     initialProps.addImage.mockClear();
//     initialProps.afterOnClick.mockClear();
//   });

//   const getAddImageButton = (props) => mount(<AddImageButton {...props} />);

//   // describe('AddImageButton appeareance test suite', () => {
//   //   it('should render StyledAddImageButton consitently', () => {
//   //     expect(toJson(mount(<StyledAddImageButton />)))
//   //       .toMatchSnapshot();
//   //   });

//   //   // it('should render StyledImage consitently', () => {
//   //   //   expect(toJson(mount(<StyledImage />)))
//   //   //     .toMatchSnapshot();
//   //   // });

//   //   // it('should render StyledImageAttributes consitently', () => {
//   //   //   expect(toJson(mount(<StyledImageAttributes />)))
//   //   //     .toMatchSnapshot();
//   //   // });

//   //   // it('should render StyledImageWrapper consitently', () => {
//   //   //   expect(toJson(mount(<StyledImageWrapper />)))
//   //   //     .toMatchSnapshot();
//   //   // });

//   //   it('should render AddImageButton consitently', () => {
//   //     expect(toJson(getAddImageButton(initialProps)))
//   //       .toMatchSnapshot();
//   //   });

//   //   it('should render AddImageButton consitently while loading', () => {
//   //     expect(toJson(getAddImageButton({
//   //       ...initialProps,
//   //       loading: true,
//   //     })))
//   //       .toMatchSnapshot();
//   //   });
//   // });

//   // describe('AddImageButton component test suite', () => {
//   //   it('should render', () => {
//   //     const wrapper = getAddImageButton(initialProps);
//   //     expect(wrapper.exists()).toBeTruthy();
//   //   });
//   // });
// });
