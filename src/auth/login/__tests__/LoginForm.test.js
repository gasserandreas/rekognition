/* global testUtils */
import React from 'react';

import { mount } from 'enzyme';

import { TextInput, CheckBox, Field } from '../../../ui/form/Form';
import Message from '../../../ui/form/Message';
import Button from '../../../ui/form/Button';

import { __testables__ } from '../LoginForm';

const {
  formikConfig, validationSchema, mapPropsToValues, handleSubmit, LoginForm,
} = __testables__;

describe('Login form test suite', () => {
  describe('LoginForm test suite', () => {
    const inputFields = ['email', 'password', 'remember'];

    const getFormProps = (values) => {
      // create basic formit state
      const props = testUtils.createFormitState(inputFields);

      // enhance and modify for local usage
      return {
        ...props,
        values: {
          ...props.values,
          remember: false,
          ...values,
        },
      };
    };

    it('should render', () => {
      const props = getFormProps();
      const wrapper = mount(<LoginForm {...props} />);
      expect(wrapper).toBeTruthy();
    });

    it('should render error if touched already', () => {
      // generate error state
      const props = {
        ...getFormProps(),
        touched: inputFields.reduce(
          (prev, cur) => ({
            ...prev,
            [cur]: true,
          }),
          {},
        ),
        errors: inputFields.reduce(
          (prev, cur) => ({
            ...prev,
            [cur]: true,
          }),
          {},
        ),
      };
      const wrapper = mount(<LoginForm {...props} />);

      // test fields
      const fields = wrapper.find(Field);
      fields.forEach((field) => {
        expect(field.props().error).toBeTruthy();
      });

      // test input fields
      const textInputs = wrapper.find(TextInput);
      textInputs.forEach((textInput) => {
        expect(textInput.props().error).toBeTruthy();
      });

      const checkbox = wrapper.find(CheckBox);
      expect(checkbox.props().error).toBeTruthy();
    });

    it('should render error if not yet touched', () => {
      // generate error state
      const props = {
        ...getFormProps(),
        touched: inputFields.reduce(
          (prev, cur) => ({
            ...prev,
            [cur]: false,
          }),
          {},
        ),
        errors: inputFields.reduce(
          (prev, cur) => ({
            ...prev,
            [cur]: true,
          }),
          {},
        ),
      };
      const wrapper = mount(<LoginForm {...props} />);

      // test fields
      const fields = wrapper.find(Field);
      fields.forEach((field) => {
        expect(field.props().error).toBeFalsy();
      });

      // test input fields
      const textInputs = wrapper.find(TextInput);
      textInputs.forEach((textInput) => {
        expect(textInput.props().error).toBeFalsy();
      });

      const checkbox = wrapper.find(CheckBox);
      expect(checkbox.props().error).toBeFalsy();
    });

    it('should show error message if error props is set', () => {
      const props = {
        ...getFormProps(),
        error: true,
      };
      const wrapper = mount(<LoginForm {...props} />);
      expect(wrapper).toBeTruthy();

      // check for error message
      const message = wrapper.find(Message);
      expect(message).toBeTruthy();
    });

    it('reset button should be disabled if not dirty', () => {
      const wrapper = mount(<LoginForm {...getFormProps()} />);
      const resetButton = wrapper.find(Button).filterWhere(n => n.props().testId === 'jestResetButton');
      expect(resetButton.props().disabled).toBeTruthy();
    });

    it('reset button should be disabled if submitting', () => {
      const props = {
        ...getFormProps(),
        dirty: true,
        submitting: true,
      };
      const wrapper = mount(<LoginForm {...props} />);
      const resetButton = wrapper.find(Button).filterWhere(n => n.props().testId === 'jestResetButton');
      expect(resetButton.props().disabled).toBeTruthy();
    });

    it('submit button should be disabled if submitting', () => {
      const props = {
        ...getFormProps(),
        submitting: true,
      };
      const wrapper = mount(<LoginForm {...props} />);
      const submitButton = wrapper.find(Button).filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().disabled).toBeTruthy();
    });

    it('submit button should get loading props', () => {
      const props = {
        ...getFormProps(),
        submitting: true,
      };
      const wrapper = mount(<LoginForm {...props} />);
      const submitButton = wrapper.find(Button).filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().loading).toBeTruthy();
    });

    // important to trigger Formik
    it('submit button should be type of submit', () => {
      const wrapper = mount(<LoginForm {...getFormProps()} />);
      const submitButton = wrapper.find(Button).filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().type).toEqual('submit');
    });
  });

  describe('formikConfig test suite', () => {
    it('formikConfig object should be valid', () => {
      expect(Object.keys(formikConfig)).toEqual([
        'validationSchema',
        'mapPropsToValues',
        'handleSubmit',
        'displayName',
      ]);
    });

    it('validationSchema should be consistent', () => {
      const { fields } = validationSchema;
      const { email, password } = fields;

      expect(email).toBeTruthy();
      expect(password).toBeTruthy();
    });

    it('should handle mapPropsToValues', () => {
      const user = {
        name: 'Test user',
      };
      const props = { user };
      expect(mapPropsToValues(props)).toEqual(user);
    });

    it('should handle handleSubmit', () => {
      const callback = jest.fn();
      const payload = 'payload';
      const props = {
        onSubmit: callback,
      };
      const obj = {
        props,
      };

      // execute handleSubmit
      handleSubmit(payload, obj);

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(payload);
    });
  });
});
