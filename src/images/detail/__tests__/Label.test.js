import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Label from '../Label';

describe('Faces test suite', () => {
  const mockedLabel = {
    id: 'f7ba4488-4db3-484d-9af9-37f1a7a2aeb2',
    name: 'name',
    confidence: 100,
    value: 'value',
    parents: [],
    instances: [{
      height: 100,
      width: 90,
      left: 80,
      top: 70,
    }],
  };

  const initialProps = {
    label: mockedLabel,
    selected: false,
    isClickable: true,
    onClick: jest.fn(),
  };

  const getLabel = (props) => mount(
    <Label
      {...initialProps}
      {...props}
    />
  );

  afterEach(() => {
    initialProps.onClick.mockClear();
  });

  it('should render label', () => {
    const wrapper = getLabel();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('#jestConfidence').exists()).toBeTruthy();
  });

  it('should not render consistence if undefined', () => {
    const wrapper = getLabel({
      ...initialProps,
      label: {
        ...initialProps.label,
        confidence: undefined,
      },
    });
    
    expect(wrapper.find('#jestConfidence').exists()).toBeFalsy();
  });

  it('should render consistently', () => {
    const wrapper = getLabel();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render consistently for isClickable not enabled', () => {
    const wrapper = getLabel({
      ...initialProps,
      isClickable: false,
    });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render consistently for being selected', () => {
    const wrapper = getLabel({
      ...initialProps,
      selected: true,
    });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});