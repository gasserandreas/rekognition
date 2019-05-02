import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Labels, { __testables__ } from '../Labels';
import Label from '../Label';

const { isClickEnabled } = __testables__;

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

  const alternativeLabel = {
    ...mockedLabel,
    id: 'd9ba4488-4db3-484d-9af9-37f1a7a2aeb2',
    name: 'name alternative',
  };

  const initialProps = {
    labels: [
      mockedLabel,
      alternativeLabel,
    ],
    selectedLabel: mockedLabel,
    onLabelClick: jest.fn(),
  };

  const getLabels = (props) => mount(
    <Labels
      {...initialProps}
      {...props}
    />
  );

  afterEach(() => {
    initialProps.onLabelClick.mockClear();
  });

  it('should render label', () => {
    const wrapper = getLabels();
    expect(wrapper.exists()).toBeTruthy();

    const labels = wrapper.find(Label);
    expect(labels.length).toEqual(initialProps.labels.length);
  });

  it('should render consistently', () => {
    const wrapper = getLabels();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle onClick', () => {
    const wrapper = getLabels();
    expect(wrapper.exists()).toBeTruthy();

    const label = wrapper
      .find(Label)
      .filterWhere(n => n.props().label.id === mockedLabel.id);
    expect(label.exists()).toBeTruthy();

    expect(initialProps.onLabelClick).not.toHaveBeenCalled();

    // simulate click
    label.simulate('click');

    expect(initialProps.onLabelClick).toHaveBeenCalled();
    expect(initialProps.onLabelClick).toHaveBeenCalledWith(mockedLabel);
  });

  it('should handle onClick if label does not have instances', () => {
    const wrapper = getLabels({
      labels: [
        {
          ...mockedLabel,
          instances: [],
        },
      ],
    });
    expect(wrapper.exists()).toBeTruthy();

    const label = wrapper
      .find(Label)
      .filterWhere(n => n.props().label.id === mockedLabel.id);
    expect(label.exists()).toBeTruthy();

    expect(initialProps.onLabelClick).not.toHaveBeenCalled();

    // simulate click
    label.simulate('click');

    expect(initialProps.onLabelClick).not.toHaveBeenCalled();
  });

  it('should set selected for selected label', () => {
    const wrapper = getLabels();
    expect(wrapper.exists()).toBeTruthy();

    const label = wrapper
      .find(Label)
      .filterWhere(n => n.props().selected);
    expect(label.exists()).toBeTruthy();

    expect(label.props().label).toEqual(initialProps.selectedLabel);
  });

  describe('isClickEnabled test suite', () => {
    it('should work', () => {
      expect(isClickEnabled({ instances: [] })).toBeFalsy();
      expect(isClickEnabled({ instances: [{}] })).toBeTruthy();
    });
  });
});