import React from 'react';
import { mount } from 'enzyme';

import 'jest-styled-components';
import { MemoryRouter } from 'react-router-dom';

import RegisterView from '../RegisterView';
import RegisterForm from '../RegisterForm';
import CheckEmailForm from '../CheckEmailForm';
import { AuthHeader, AuthFooter } from '../../AuthComponents';

describe('RegisterView test suite', () => {
  let initialProps;

  const getRegisterView = (props) => mount(
    <MemoryRouter>
      <RegisterView {...props} />
    </MemoryRouter>
  );

  beforeEach(() => {
    initialProps  = {
      isAuthenticated: false,
      histroy: {
        push: jest.fn(),
      },
      signupRequest: {
        error: null,
        loading: false,
      },
      checkEmailRequest: {
        error: null,
        loading: false,
      },
      validEmail: null,
      signupUser: jest.fn(),
      checkEmail: jest.fn(),
      invalidateEmail: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = getRegisterView(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find(AuthHeader).exists()).toBeTruthy();
    expect(wrapper.find(RegisterForm).exists()).toBeFalsy();
    expect(wrapper.find(CheckEmailForm).exists()).toBeTruthy();

    // check auth footer
    const footers = wrapper.find(AuthFooter);
    expect(footers.length).toEqual(2);
  });

  it('should render RegisterForm for valid email', () => {
    const wrapper = getRegisterView({
      ...initialProps,
      validEmail: true,
    });
    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find(AuthHeader).exists()).toBeTruthy();
    expect(wrapper.find(RegisterForm).exists()).toBeTruthy();
    expect(wrapper.find(CheckEmailForm).exists()).toBeFalsy();

    // check auth footer
    const footers = wrapper.find(AuthFooter);
    expect(footers.length).toEqual(2);
  });

  it('should pass request props to CheckEmailForm', () => {
    const checkEmailRequest = {
      loading: true,
      error: {
        message: 'error message',
      },
    };
    const wrapper = getRegisterView({
      ...initialProps,
      checkEmailRequest,
    });
    expect(wrapper.exists()).toBeTruthy();

    const checkEmailForm = wrapper.find(CheckEmailForm);
    expect(checkEmailForm.exists()).toBeTruthy();

    const { submitting, error } = checkEmailForm.props();
    expect(submitting).toEqual(checkEmailRequest.loading);
    expect(error).toEqual(checkEmailRequest.error.message);
  });

  it('should pass empty error props to CheckEmailForm if no error', () => {
    const checkEmailRequest = {
      loading: true,
      error: null,
    };
    const wrapper = getRegisterView({
      ...initialProps,
      checkEmailRequest,
    });
    expect(wrapper.exists()).toBeTruthy();

    const checkEmailForm = wrapper.find(CheckEmailForm);
    expect(checkEmailForm.exists()).toBeTruthy();
    expect(checkEmailForm.props().error).toEqual(null);
  });

  it('should pass request props to RegisterForm', () => {
    const signupRequest = {
      loading: true,
      error: {
        message: 'error message',
      },
    };
    const wrapper = getRegisterView({
      ...initialProps,
      signupRequest,
      validEmail: true,
    });
    expect(wrapper.exists()).toBeTruthy();

    const registerForm = wrapper.find(RegisterForm);
    expect(registerForm.exists()).toBeTruthy();

    const { submitting, error } = registerForm.props();
    expect(submitting).toEqual(signupRequest.loading);
    expect(error).toEqual(signupRequest.error.message);
  });

  it('should pass empty error props to RegisterForm if no error', () => {
    const signupRequest = {
      loading: true,
      error: null,
    };
    const wrapper = getRegisterView({
      ...initialProps,
      signupRequest,
      validEmail: true,
    });
    expect(wrapper.exists()).toBeTruthy();

    const registerForm = wrapper.find(RegisterForm);
    expect(registerForm.exists()).toBeTruthy();
    expect(registerForm.props().error).toEqual(null);
  });

  it('should handle CheckEmailForm:onSubmit', () => {
    const wrapper = getRegisterView(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    const checkEmailForm = wrapper.find(CheckEmailForm);
    expect(checkEmailForm.exists()).toBeTruthy();

    const attr = {
      email: 'test.user@test.com',
    };

    // fire submit
    expect(initialProps.checkEmail).not.toHaveBeenCalled();
    checkEmailForm.props().onSubmit(attr);

    // check callback
    expect(initialProps.checkEmail).toHaveBeenCalled();
    expect(initialProps.checkEmail).toHaveBeenCalledWith(attr.email);

    // check email props
    wrapper.update();
    expect(wrapper.find(CheckEmailForm).props().user.email).toEqual(attr.email);
  });

  it('should handle RegisterForm:onCancelSignUp', () => {
    const wrapper = getRegisterView({
      ...initialProps,
      validEmail: true,
    });
    expect(wrapper.exists()).toBeTruthy();

    const registerForm = wrapper.find(RegisterForm);
    expect(registerForm.exists()).toBeTruthy();

    // fire submit
    expect(initialProps.invalidateEmail).not.toHaveBeenCalled();
    registerForm.props().onCancel();

    // check callback
    expect(initialProps.invalidateEmail).toHaveBeenCalled();
  });

  it('should handle RegisterForm:onSubmit', () => {
    const wrapper = getRegisterView({
      ...initialProps,
      validEmail: true,
    });
    expect(wrapper.exists()).toBeTruthy();

    const registerForm = wrapper.find(RegisterForm);
    expect(registerForm.exists()).toBeTruthy();

    // fire submit
    expect(initialProps.signupUser).not.toHaveBeenCalled();
    registerForm.props().onSubmit();

    // check callback
    expect(initialProps.signupUser).toHaveBeenCalled();
  });
});
