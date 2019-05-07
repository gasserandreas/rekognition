import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Yup from 'yup';
import { withFormik } from 'formik';

import { Field, TextInput, FieldRow } from '../ui/form/Form';
import Button from '../ui/form/Button';
import Message from '../ui/form/Message';

import ButtonGroup from '../ui/form/ButtonGroup';

// formik setups
const validationSchema = Yup.object().shape({
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
  };
};

const onHandleSubmit = (payload, { props }) => {
  props.onSubmit(payload);
};

const formikConfig = {
  validationSchema,
  mapPropsToValues,
  handleSubmit: onHandleSubmit,
  displayName: 'UpdateUserForm',
};

const formikEnhancer = withFormik(formikConfig);

// styled
const StyledUpdateUserForm = styled.form``;

const UpdateUserForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  submitting,
  dirty,
  error,
}) => {
  const handleOnReset = () => {
    // reset form
    handleReset();
  };

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
        <Field id="lastname" label="Lastname" error={touched.lastname && errors.lastname} inline>
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
          onClick={handleOnReset}
          disabled={!dirty || submitting}
          testId="jestResetButton"
        >
          Reset
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          buttonStyle="primary"
          style={{ marginLeft: '1rem' }}
          testId="jestSubmitButton"
        >
          Update profile
        </Button>
      </ButtonGroup>
    </StyledUpdateUserForm>
  );
};

UpdateUserForm.propTypes = {
  values: PropTypes.shape({}).isRequired,
  touched: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
  dirty: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const EnhancedUpdateUserForm = formikEnhancer(UpdateUserForm);

EnhancedUpdateUserForm.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
};

EnhancedUpdateUserForm.defaultProps = {
  user: {
    firstname: '',
    lastname: '',
  },
};

export const __testables__ = {
  formikConfig,
  formikEnhancer,
  validationSchema,
  mapPropsToValues,
  handleSubmit: onHandleSubmit,
  UpdateUserForm,
};

export default EnhancedUpdateUserForm;
