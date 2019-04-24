/* global testUtils */
import React from 'react';

import { mount } from 'enzyme';

import { TextInput, Field } from '../../ui/form/Form';
import Message from '../../ui/form/Message';
import Button from '../../ui/form/Button';

import { __testables__ } from '../UpdateUserForm';
const {
  formikConfig,
  validationSchema,
  mapPropsToValues,
  handleSubmit,
  UpdateUserForm,
} = __testables__;

describe('Register form test suite', () => {

  describe('Register test suite', () => {
    const inputFields = ['password', 'firstname', 'lastname', 'remember'];

    const getFormProps = (values) => {
      // create basic formit state
      const props = testUtils.createFormitState(inputFields);
      return props;
    };

    it('should render', () => {
      const props = getFormProps();
      const wrapper = mount(<UpdateUserForm {...props} />);
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
      const wrapper = mount(<UpdateUserForm {...props} />);
      
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
      const wrapper = mount(<UpdateUserForm {...props} />);
      
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
      const wrapper = mount(<UpdateUserForm {...props} />);
      expect(wrapper).toBeTruthy();

      // check for error message
      const message = wrapper.find(Message);
      expect(message).toBeTruthy();
      expect(message.text()).toEqual(error);
    });

    it('reset button should be disabled if submitting', () => {
      const props = {
        ...getFormProps(),
        dirty: true,
        submitting: true,
      };
      const wrapper = mount(<UpdateUserForm {...props} />);
      const resetButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestResetButton');
      expect(resetButton.props().disabled).toBeTruthy();
    });

    it('reset button should be disabled if not dirty', () => {
      const props = {
        ...getFormProps(),
        dirty: false,
      };
      const wrapper = mount(<UpdateUserForm {...props} />);
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
      const wrapper = mount(<UpdateUserForm {...props} />);
      const submitButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().disabled).toBeTruthy();
    });

    // important to trigger Formik
    it('submit button should be type of submit', () => {
      const wrapper = mount(<UpdateUserForm {...getFormProps()} />);
      const submitButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestSubmitButton');
      expect(submitButton.props().type).toEqual('submit');
    });

    it('should handle handleOnReset', () => {
      const props = {
        ...getFormProps(),
        handleReset: jest.fn(),
        dirty: true,
      };

      const wrapper = mount(<UpdateUserForm {...props} />);
      const resetButton = wrapper
        .find(Button)
        .filterWhere(n => n.props().testId === 'jestResetButton');
      expect(resetButton.exists()).toBeTruthy();

      expect(props.handleReset).not.toHaveBeenCalled();

      // simulate click
      resetButton.simulate('click');

      expect(props.handleReset).toHaveBeenCalled();
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
      const { firstname, lastname } = fields;

      expect(firstname).toBeTruthy();
      expect(lastname).toBeTruthy();
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
