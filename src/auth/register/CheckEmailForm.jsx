import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Yup from 'yup';
import { withFormik } from 'formik';

import { Field, TextInput } from '../../ui/form/Form';
import Button from '../../ui/form/Button';
import Message from '../../ui/form/Message';

import ButtonGroup from '../../ui/form/ButtonGroup';

// formik setups
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
});

const mapPropsToValues = (obj) => {
  const { user } = obj;
  return {
    ...user,
  };
};

const onHandleSubmit = (payload, { props }) => {
  props.onSubmit(payload);
};

const formikConfig = {
  validationSchema,
  mapPropsToValues,
  handleSubmit: onHandleSubmit,
  displayName: 'CheckEmailForm',
};

const formikEnhancer = withFormik(formikConfig);

// styled
const StyledCheckEmailForm = styled.form``;

const CheckEmailForm = (props) => {
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
    validEmail,
  } = props;
  return (
    <StyledCheckEmailForm onSubmit={handleSubmit}>
      <Field id="email" label="Email" error={touched.email && errors.email}>
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
      {validEmail === false && <Message appearance="error">Email is already in use, please use other.</Message>}
      {error && <Message appearance="error">{error}</Message>}
      <ButtonGroup>
        <Button
          type="button"
          buttonStyle="link"
          onClick={handleReset}
          disabled={!dirty || submitting}
          testId="jestResetButton"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          buttonStyle="primary"
          style={{ marginLeft: '1rem' }}
          loading={submitting}
          testId="jestSubmitButton"
        >
          Check email
        </Button>
      </ButtonGroup>
    </StyledCheckEmailForm>
  );
};

CheckEmailForm.propTypes = {
  error: PropTypes.node,
  validEmail: PropTypes.string,
  values: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  dirty: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

CheckEmailForm.defaultProps = {
  error: null,
  validEmail: null,
};

const EnhancedCheckEmailForm = formikEnhancer(CheckEmailForm);

EnhancedCheckEmailForm.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  validEmail: PropTypes.bool,
  error: PropTypes.string,
};

EnhancedCheckEmailForm.defaultProps = {
  user: {
    email: '',
  },
  validEmail: null,
  error: '',
};

export const __testables__ = {
  formikConfig,
  formikEnhancer,
  validationSchema,
  mapPropsToValues,
  handleSubmit: onHandleSubmit,
  CheckEmailForm,
};

export default EnhancedCheckEmailForm;
