import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Yup from 'yup';
import { withFormik } from 'formik';
// import { Grid, Box } from 'grommet';

import {
  Field,
  TextInput,
  FieldRow,
} from '../ui/form/Form';
import Button from '../ui/form/Button';
import Message from '../ui/form/Message';

import ButtonGroup from '../ui/form/ButtonGroup';

// formik setups
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
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
  displayName: 'UpdateUserForm',
});

// styled
const StyledUpdateUserForm = styled.form``;

class UpdateUserForm extends Component {
  onReset = this.onReset.bind(this);

  onReset() {
    const { handleReset } = this.props;

    // reset form
    handleReset();
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
      dirty,
      error,
    } = this.props;
    return (
      <StyledUpdateUserForm onSubmit={handleSubmit}>
        <FieldRow>
          <Field
            id="firstname"
            label="Firstname"
            error={touched.firstname && errors.firstname}
            style={{ marginRight: '0.5rem' }}
            inline
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
            inline
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
        </FieldRow>
        {error && <Message appearance="error">{error}</Message>}
        <ButtonGroup>
          <Button
            type="button"
            buttonStyle="link"
            onClick={this.onReset}
            disabled={!dirty || submitting}
          >Reset</Button>
          <Button
            type="submit"
            disabled={submitting}
            buttonStyle="primary"
            style={{ marginLeft: '1rem' }}
          >Update profile</Button>
        </ButtonGroup>
      </StyledUpdateUserForm>
    );
  }
}

const EnhancedUpdateUserForm = formikEnhancer(UpdateUserForm);

EnhancedUpdateUserForm.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
  validEmail: PropTypes.bool,
};

EnhancedUpdateUserForm.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
  },
};

export default EnhancedUpdateUserForm;
