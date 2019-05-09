import React from 'react';
import { mount } from 'enzyme';

import 'jest-styled-components';
import { MemoryRouter } from 'react-router-dom';

import LoginView from '../LoginView';
import LoginForm from '../LoginForm';
import { AuthHeader, AuthFooter } from '../../AuthComponents';

describe('LoginView test suite', () => {
  let initialProps;

  const getLoginView = props => mount(
    <MemoryRouter>
      <LoginView {...props} />
    </MemoryRouter>,
  );

  beforeEach(() => {
    initialProps = {
      isAuthenticated: false,
      history: {
        push: jest.fn(),
      },
      loginRequest: {
        error: null,
        loading: false,
      },
      logInUser: jest.fn(),
    };
  });

  it('should render', () => {
    const wrapper = getLoginView(initialProps);
    expect(wrapper).toBeTruthy();

    expect(wrapper.find(AuthHeader)).toBeTruthy();
    expect(wrapper.find(LoginForm)).toBeTruthy();

    // check auth footer
    const footers = wrapper.find(AuthFooter);
    expect(footers.length).toEqual(2);
  });

  it('should pass error message to LoginForm', () => {
    const message = 'error message';
    const wrapper = getLoginView({
      ...initialProps,
      loginRequest: {
        error: {
          message,
        },
        loading: false,
      },
    });

    expect(wrapper).toBeTruthy();

    const loginForm = wrapper.find(LoginForm);
    expect(loginForm.props().error).toEqual(message);
  });

  it('should handle onSubmit', () => {
    const wrapper = getLoginView(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    const loginForm = wrapper.find(LoginForm);
    expect(loginForm.exists()).toBeTruthy();

    // fire submit
    expect(initialProps.logInUser).not.toHaveBeenCalled();
    loginForm.props().onSubmit();

    // check callback
    expect(initialProps.logInUser).toHaveBeenCalled();
  });
});
