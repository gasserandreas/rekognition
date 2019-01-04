import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Yup from 'yup';
import { withFormik } from 'formik';

import {
  Field,
  TextInput,
} from '../../ui/Form';
import Button from '../../ui/Button';
import Message from '../../ui/Message';

import { ButtonGroup } from '../AuthComponents';

// formik setups
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
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
  displayName: 'CheckEmailForm',
});

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
      {validEmail === false && <Message appearance="error">Email is already in use, please use other.</Message>}
      {error && <Message appearance="error">{error}</Message>}
      <ButtonGroup>
        <Button
          type="button"
          buttonStyle="link"
          onClick={handleReset}
          disabled={!dirty || submitting}
        >Cancel</Button>
        <Button
          type="submit"
          disabled={submitting}
          buttonStyle="primary"
          style={{ marginLeft: '1rem' }}
        >Check email</Button>
      </ButtonGroup>
    </StyledCheckEmailForm>
  );
};

const EnhancedCheckEmailForm = formikEnhancer(CheckEmailForm);

EnhancedCheckEmailForm.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  validEmail: PropTypes.bool,
};

EnhancedCheckEmailForm.defaultProps = {
  user: {
    email: '',
  },
  validEmail: null,
};

export default EnhancedCheckEmailForm;
