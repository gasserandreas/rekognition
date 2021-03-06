import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import {
  Field, TextInput, CheckBox, FieldRow, __testables__,
} from '../Form';

const {
  StyledFieldLabel, StyledFieldFeedback, StyledTextInput, StyledCheckBox, StyledFieldRow,
} = __testables__;

const initialProps = {
  children: <p>child</p>,
};

const getShallowField = (props = {}) => shallow(<Field {...initialProps} {...props} />);
const getMountField = (props = {}) => mount(<Field {...initialProps} {...props} />);

// Field component tests
it('Field should render correctly', () => {
  const wrapper = getShallowField();
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Extended Field should render correctly', () => {
  const Input = <TextInput value="" onChange={() => {}} />;
  const label = 'Custom label';

  const wrapper = shallow(<Field label={label}>{Input}</Field>);
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('Field should render content', () => {
  const props = {
    children: <TextInput value="" onChange={() => {}} />,
  };
  const output = getMountField(props);
  expect(output.props().children).toEqual(props.children);
});

it('Field should not render label if no label is passed in', () => {
  const output = getShallowField({ label: undefined });
  expect(output.find(StyledFieldLabel).length).toEqual(0);
});

it('Field should render label with custom props', () => {
  const props = {
    id: 'id12-3456',
    error: 'custom error',
    label: 'label',
  };
  const output = getShallowField(props);

  // should contains label content
  expect(output.contains(props.label)).toEqual(true);

  // check for label component
  const label = output.find(StyledFieldLabel);
  expect(label.exists()).toBeTruthy();

  // check for label props
  const labelProps = label.props();

  expect(labelProps.children).toEqual(props.label);
  expect(labelProps.htmlFor).toEqual(props.id);
});

it('Field should not render Feedback if no error is passed in', () => {
  const output = getShallowField({ error: '' });
  expect(output.find(StyledFieldFeedback).length).toEqual(0);
});

it('Field should render Feedback with error', () => {
  const props = {
    error: 'error',
  };
  const output = getShallowField(props);

  const feedback = output.find(StyledFieldFeedback);
  expect(feedback).toBeTruthy();

  const feedbackProps = feedback.props();
  expect(feedbackProps.children).toEqual(props.error);
});

// Input tests
it('TextInput should work correctly', () => {
  const wrapper = shallow(<TextInput />);
  expect(wrapper.exists()).toBeTruthy();
});

it('Input styles should be consistent', () => {
  const wrapper = shallow(<StyledTextInput />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('Disabled input should render correctly', () => {
  const wrapper = shallow(<StyledTextInput disabled />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('Error Input should render correctly', () => {
  const wrapper = shallow(<StyledTextInput error="error" />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

// Checkbox tests
it('CheckBox should work correctly', () => {
  const wrapper = shallow(<CheckBox />);
  expect(wrapper.exists()).toBeTruthy();
});

it('Checkbox styles should be consistent', () => {
  const wrapper = shallow(<StyledCheckBox />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('Checkbox Input should render correctly', () => {
  const wrapper = shallow(<StyledCheckBox error="error" />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

// Test StyledFieldRow
it('FieldRow should work correctly', () => {
  const wrapper = shallow(<FieldRow><p>fieldrow</p></FieldRow>);
  expect(wrapper.exists()).toBeTruthy();
});

it('FieldRow styles should be consistent', () => {
  const wrapper = shallow(<StyledFieldRow />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
