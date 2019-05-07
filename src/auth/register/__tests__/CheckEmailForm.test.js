/* global testUtils */
import React from 'react';

import { mount } from 'enzyme';

import { TextInput, CheckBox, Field } from '../../../ui/form/Form';
import Message from '../../../ui/form/Message';
import Button from '../../../ui/form/Button';

import { __testables__ } from '../CheckEmailForm';
const {
  formikConfig,
  validationSchema,
  mapPropsToValues,
  handleSubmit,
  CheckEmailForm,
} = __testables__;

describe('Register form test suite', () => {

  describe('Register test suite', () => {
    const inputFields = ['email'];

    const getFormProps = (values) => {
      // create basic formit state
      const props = testUtils.createFormitState(inputFields);

      return props;
      // // enhance and modify for local usage
      // return {
      //   ...props,
      //   error: null,
      //   values: {
      //     ...props.values,
      //     'remember': false,
      //     ...values,
      //   },
      // };
    };

    // const disabledFilter = (a) => {
    //   const { disabled } = a.props();

    //   return !disabled;
    // }

    it('should render', () => {
      const props = getFormProps();
      const wrapper = mount(<CheckEmailForm {...props} />);
      expect(wrapper).toBeTruthy();
    });

    it('should render error if touched already', () => {
      // generate error state
      const props = {
        ...getFormProps(),
        touched: inputFields.reduce((prev, cur) => ({
          ...prev,
          [cur]: true,
        }), {}),
        errors: inputFields.reduce((prev, cur) => ({
          ...prev,
          [cur]: true,
        }), {}),
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      
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
    });

    it('should render error if not yet touched', () => {
      // generate error state
      const props = {
        ...getFormProps(),
        touched: inputFields.reduce((prev, cur) => ({
          ...prev,
          [cur]: false,
        }), {}),
        errors: inputFields.reduce((prev, cur) => ({
          ...prev,
          [cur]: true,
        }), {}),
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      
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
    });

    it('should show error message if error props is set', () => {
      const error = "Error message";
      const props = {
        ...getFormProps(),
        error,
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      expect(wrapper).toBeTruthy();

      // check for error message
      const message = wrapper.find(Message);
      expect(message).toBeTruthy();
      expect(message.text()).toEqual(error);
    });

    it('should show message if email is already registered', () => {
      const validEmail = false;
      const props = {
        ...getFormProps(),
        validEmail,
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      expect(wrapper).toBeTruthy();

      // check for error message
      const message = wrapper.find(Message);
      expect(message).toBeTruthy();
      expect(message.text()).toEqual('Email is already in use, please use other.');
    });

    it('reset button should be disabled if submitting', () => {
      const props = {
        ...getFormProps(),
        dirty: true,
        submitting: true,
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      const resetButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestResetButton');
      expect(resetButton.props().disabled).toBeTruthy();
    });

    it('submit button should be disabled if submitting', () => {
      const props = {
        ...getFormProps(),
        submitting: true,
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      const submitButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().disabled).toBeTruthy();
    });

    it('submit button should get loading props', () => {
      const props = {
        ...getFormProps(),
        submitting: true,
      };
      const wrapper = mount(<CheckEmailForm {...props} />);
      const submitButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().loading).toBeTruthy();
    });

    // important to trigger Formik
    it('submit button should be type of submit', () => {
      const wrapper = mount(<CheckEmailForm {...getFormProps()} />);
      const submitButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().type).toEqual('submit');
    });

    it('should handle handleOnReset', () => {
      const handleReset = jest.fn();
      const props = {
        ...getFormProps(),
        handleReset,
        dirty: true,
      };

      const wrapper = mount(<CheckEmailForm {...props} />);
      const resetButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestResetButton');
      expect(resetButton.exists()).toBeTruthy();

      expect(handleReset).not.toHaveBeenCalled();

      // simulate click
      resetButton.simulate('click');
      
      expect(handleReset).toHaveBeenCalled();
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
      const { email } = fields;

      expect(email).toBeTruthy();
    });

    it('should handle mapPropsToValues', () => {
      const user = {
        name: 'User',
        firstname: 'Test'
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
