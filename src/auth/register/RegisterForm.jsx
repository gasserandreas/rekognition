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
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required!'),
  firstname: Yup.string()
    .min(2)
    .max(30)
    .required('Firstname is required!'),
  lastname: Yup.string()
    .min(2)
    .max(30)
    .required('Lastname is required!'),
});

const mapPropsToValues = (obj) => {
  const { user } = obj;
  return {
    ...user,
  }
};

const handleSubmit = (payload, { props }, b, c) => {
  props.onSubmit(payload);
};


const formikConfig = {
  validationSchema,
  mapPropsToValues,
  handleSubmit,
  displayName: 'RegisterForm',
};

const formikEnhancer = withFormik(formikConfig);

// styled
const StyledRegisterForm = styled.form``;

const RegisterForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  submitting,
  error,
  onCancel,
  handleReset,
}) => {
  const handleOnReset = () => {
    // reset form
    handleReset();

    // cancel form
    onCancel();
  };

  return (
    <StyledRegisterForm onSubmit={handleSubmit}>
      <Field
        id="email"
        label="Email"
        disabled
      >
        <TextInput
          id="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          disabled
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
        id="firstname"
        label="Firstname"
        error={touched.firstname && errors.firstname}
      >
        <TextInput
          id="firstname"
          type="text"
          placeholder="Enter your Firstname"
          error={touched.firstname && errors.firstname}
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field
        id="lastname"
        label="Lastname"
        error={touched.lastname && errors.lastname}
      >
        <TextInput
          id="lastname"
          type="text"
          placeholder="Enter your Lastname"
          error={touched.lastname && errors.lastname}
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Field>
      <Field
        id="remember"
        label="Remember me"
        error={touched.remember && errors.remember}
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
      {error !== null && <Message appearance="error">{error}</Message>}
      <ButtonGroup>
        <Button
          type="button"
          buttonStyle="link"
          onClick={handleOnReset}
          disabled={submitting}
          testId="jestResetButton"
        >Go back</Button>
        <Button
          type="submit"
          disabled={submitting}
          buttonStyle="primary"
          style={{ marginLeft: '1rem' }}
          loading={submitting}
          testId="jestSubmitButton"
        >Signup</Button>
      </ButtonGroup>
    </StyledRegisterForm>
  );
};

const EnhancedRegisterForm = formikEnhancer(RegisterForm);

EnhancedRegisterForm.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    password: PropTypes.string,
    remember: PropTypes.bool,
  }),
  error: PropTypes.string,
  validEmail: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EnhancedRegisterForm.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    password: '',
    remember: false,
  },
  validEmail: undefined,
  error: '',
};

export const __testables__ = {
  formikConfig,
  formikEnhancer,
  validationSchema,
  mapPropsToValues,
  handleSubmit,
  RegisterForm,
};

export default EnhancedRegisterForm;
