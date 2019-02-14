/* global React, shallow, mount, render, renderer, testSnapshot */

import {
  Field,
  StyledFieldLabel,
  StyledFieldFeedback,
  TextInput,
  StyledTextInput,
  StyledCheckBox,
  StyledFieldRow,
} from '../Form';

const getShallowField = (props = {}) => shallow(<Field {...props} />);
const getMountField = (props = {}) => mount(<Field {...props} />);

// Field component tests
it('Field should render correctly', () => {
  testSnapshot(<Field />);
});

it('Extended Field should render correctly', () => {
  const Input = <TextInput value="" onChange={() => {}} />;
  const label = 'Custom label';
  testSnapshot(
    <Field
      label={label}
    >{Input}</Field>);
});

it('Field should render content', () => {
  const props = {
    children: <TextInput value="" onChange={() => {}} />,
  };
  const output = getMountField(props);
  expect(output.props().children).toEqual(props.children);
});

it('Field should not render label if no label is passed in', () => {
  const output = getShallowField();
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
  expect(label);

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
  expect(feedback);

  const feedbackProps = feedback.props();
  expect(feedbackProps.children).toEqual(props.error);
});

// Input tests
it('Input styles should be consistent', () => {
  testSnapshot(<StyledTextInput />);
});

it('Disabled input should render correctly', () => {
  testSnapshot(<StyledTextInput disabled/>);
});

it('Error Input should render correctly', () => {
  testSnapshot(<StyledTextInput error="error" />);
});

// Checkbox tests
it('Checkbox styles should be consistent', () => {
  testSnapshot(<StyledCheckBox />);
});

it('Checkbox Input should render correctly', () => {
  testSnapshot(<StyledCheckBox error="error" />);
});

// Test StyledFieldRow
it('FieldRow styles should be consistent', () => {
  testSnapshot(<StyledFieldRow />);
});
