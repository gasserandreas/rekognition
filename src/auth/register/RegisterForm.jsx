import React, { Component } from 'react';
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
  displayName: 'RegisterForm',
});

// styled
const StyledRegisterForm = styled.form``;

// const RegisterForm = (props) => {
class RegisterForm extends Component {
  onReset = this.onReset.bind(this);

  onReset() {
    const { onCancel, handleReset } = this.props;

    // reset form
    handleReset();

    // cancel form
    onCancel();
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      submitting,
      error,
    } = this.props;
    return (
      <StyledRegisterForm onSubmit={handleSubmit}>
        <Field
          id="email"
          label="Email"
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
        {error && <Message appearance="error">{error}</Message>}
        <ButtonGroup>
          <Button
            type="button"
            buttonStyle="link"
            onClick={this.onReset}
            disabled={submitting}
          >Go back</Button>
          <Button
            type="submit"
            disabled={submitting}
            buttonStyle="primary"
            style={{ marginLeft: '1rem' }}
          >Signup</Button>
        </ButtonGroup>
      </StyledRegisterForm>
    );
  }
}

const EnhancedRegisterForm = formikEnhancer(RegisterForm);

EnhancedRegisterForm.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    password: PropTypes.string,
    remember: PropTypes.bool,
  }),
  validEmail: PropTypes.bool,
};

EnhancedRegisterForm.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
    password: '',
    remember: false,
  },
};

export default EnhancedRegisterForm;
