import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Yup from 'yup';
import { withFormik } from 'formik';

import {
  Field,
  TextInput,
  CheckBox,
} from '../../ui/form/Form';
import Button from '../../ui/form/Button';
import Message from '../../ui/form/Message';

import ButtonGroup from '../../ui/form/ButtonGroup';

// formik setups
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
  displayName: 'LoginForm',
});

// styled
const StyledLoginForm = styled.form``;

const LoginForm = (props) => {
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
    <StyledLoginForm onSubmit={handleSubmit}>
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
      <Field
        id="remember"
        label="Remember me"
      >
        <CheckBox
          id="remember"
          name="remember"
          label="Always sign in on this device"
          checked={values.remember}
          error={touched.remember && errors.remember}
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
          type="submit"
          disabled={submitting}
          buttonStyle="primary"
          style={{ marginLeft: '1rem' }}
          loading={submitting}
        >Submit</Button>
      </ButtonGroup>
    </StyledLoginForm>
  );
};

const EnhancedLoginForm = formikEnhancer(LoginForm);

EnhancedLoginForm.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    remember: PropTypes.bool,
  }),
};

EnhancedLoginForm.defaultProps = {
  user: {
    email: '',
    password: '',
    remember: false,
  },
};

export default EnhancedLoginForm;
