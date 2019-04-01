import React from 'react';

import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import * as Yup from 'yup';
import { withFormik } from 'formik';

import { TextInput, CheckBox, Field, FieldRow } from './Form';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Message from './Message';

storiesOf('TextInput', module)
  .add('default', () => (
    <TextInput />
  ));

storiesOf('CheckBox', module)
  .add('default', () => (
    <CheckBox />
  ));

const formBaseName = 'Form';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required!'),
  }),
  mapPropsToValues: (obj) => {
    const { user } = obj;
    return {
      ...user,
    }
  },
  handleSubmit: (payload, { props }, b, c) => {
    props.onSubmit(payload);
  },
  displayName: 'SimpleForm',
});

const SimpleForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    submitting,
    error,
  } = props;

  return (
    <form>
      <Field
        id="email"
        label="Email"
        error={touched.email && errors.email}
      >
        <TextInput
          id="email"
          type="email"
          placeholder="Enter your email"
          error={touched.email && errors.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field
        id="password"
        label="Password"
        error={touched.password && errors.password}
      >
        <TextInput
          id="password"
          type="password"
          placeholder="Enter your password"
          error={touched.password && errors.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      {error && <Message appearance="error">Incorrect email and/or password.</Message>}
      <ButtonGroup>
        <Button
          type="button"
          buttonStyle="link"
          onClick={handleReset}
          disabled={!dirty || submitting}
        >Reset</Button>
        <Button
          type="button"
          disabled={submitting}
          buttonStyle="primary"
          style={{ marginLeft: '1rem' }}
          loading={submitting}
          onClick={handleSubmit}
        >Submit</Button>
      </ButtonGroup>
    </form>
  )
};

const EnhancedSimpleForm = formikEnhancer(SimpleForm);

storiesOf(`${formBaseName}/SimpleForm`, module)
  .add('default', () => (
    <EnhancedSimpleForm
      user={{
        email: '',
        password: '',
      }}
      onSubmit={action('form:onSubmit')}
    />
  ));


storiesOf(`${formBaseName}/Field`, module)
  .add('default', () => {
    const error = boolean('error', false);
    return (
      <Field
        id="email"
        label="Email"
        error={error}
      >
        <TextInput
          id="email"
          type="email"
          placeholder="Enter your email"
          error={error}
          value={text('value', '')}
          onChange={action('onChange')}
          onBlur={action('onBlur')}
        />
      </Field>
    )
  });

storiesOf(`${formBaseName}/FieldRow`, module)
  .add('default', () => (
    <FieldRow
      direction={select('direction', { Column: 'column', Row: 'row' }, 'column')}
    >
      <Field
        id="firstname"
        label="Firstname"
        error={false}
        style={{ marginRight: '0.5rem' }}
        inline
      >
        <TextInput
          id="firstname"
          type="text"
          placeholder="Enter your Firstname"
          error={false}
        />
      </Field>
      <Field
        id="lastname"
        label="Lastname"
        error={false}
        inline
      >
        <TextInput
          id="lastname"
          type="text"
          placeholder="Enter your Lastname"
        />
      </Field>
    </FieldRow>
  ));