import React from 'react';
import { mount } from 'enzyme';

import 'jest-styled-components';
import { MemoryRouter, Link } from 'react-router-dom';
import { Paragraph, Heading } from 'grommet';

import UserView from '../UserView';
import UpdateUserForm from '../UpdateUserForm';

import AsyncContainer from '../../ui/async/AsyncContainer';
import { getDefaultFormatedDate } from '../../util/util';

import * as Paths from '../../paths';

describe('RegisterView test suite', () => {
  const jestProfileInformation = 'jestProfileInformation';
  const jestSessionInformation = 'jestSessionInformation';
  const jestLoggedInSince = 'jestLoggedInSince';
  const jestPrivacyLink = 'jestPrivacyLink';
  const jestAutoLoggedIn = 'jestAutoLoggedIn';
  const jestPrivacyInformation = 'jestPrivacyInformation';
  const jestLogoutBox = 'jestLogoutBox';
  const jestLogOutUser = 'jestLogOutUser';

  let initialProps;

  const getUserView = (props) => mount(
    <MemoryRouter>
      <UserView {...props} />
    </MemoryRouter>
  );

  beforeEach(() => {
    initialProps  = {
      user: {

      },
      authMeta: {
        loggedInSince: 1556144958472,
        remember: true,
      },
      histroy: {
        push: jest.fn(),
      },
      getUserInfoRequest: {
        error: null,
        loading: false,
      },
      updateUserRequest: {
        error: null,
        loading: false,
      },
      getUserInfo: jest.fn(),
      updateUser: jest.fn(),
      logOutUser: jest.fn(),
    };
  });

  it('should render with loading indicator', () => {
    const wrapper = getUserView({
      ...initialProps,
      getUserInfoRequest: {
        ...initialProps.getUserInfoRequest,
        loading: true,
      },
    });
    expect(wrapper.exists()).toBeTruthy();

    // check async container state
    const asynContainer = wrapper.find(AsyncContainer);
    expect(asynContainer.exists()).toBeTruthy();
    expect(asynContainer.props().loading).toBeTruthy();

    // should not load update user form while loading
    const updateUserForm = wrapper.find(UpdateUserForm);
    expect(updateUserForm.exists()).toBeFalsy();

    // check for logout button
    const logoutButton = wrapper.find(`#${jestLogOutUser}`);
    expect(logoutButton.exists()).toBeTruthy();
  });

  it('should render UpdateUserForm if user info is loaded', () => {
    const wrapper = getUserView(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    const asynContainer = wrapper.find(AsyncContainer);
    expect(asynContainer.exists()).toBeTruthy();
    expect(asynContainer.props().loading).toBeFalsy();

    // check for UpdateUserForm
    const updateUserForm = wrapper.find(UpdateUserForm);
    expect(updateUserForm.exists()).toBeTruthy();
  });

  it('should pass request props to UpdateUserForm', () => {
    const updateUserRequest = {
      loading: true,
      error: {
        message: 'error message',
      },
    };
    const wrapper = getUserView({
      ...initialProps,
      updateUserRequest,
    });
    expect(wrapper.exists()).toBeTruthy();

    const checkEmailForm = wrapper.find(UpdateUserForm);
    expect(checkEmailForm.exists()).toBeTruthy();

    const { submitting, error } = checkEmailForm.props();
    expect(submitting).toEqual(updateUserRequest.loading);
    expect(error).toEqual(updateUserRequest.error.message);
  });

  it('should pass null error props to UpdateUserForm if no error', () => {
    const checkEmailRequest = {
      loading: true,
      error: null,
    };
    const wrapper = getUserView({
      ...initialProps,
      checkEmailRequest,
    });
    expect(wrapper.exists()).toBeTruthy();

    const checkEmailForm = wrapper.find(UpdateUserForm);
    expect(checkEmailForm.exists()).toBeTruthy();
    expect(checkEmailForm.props().error).toEqual(null);
  });

  it('should handle UpdateUserForm:onSubmit', () => {
    const wrapper = getUserView(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    const checkEmailForm = wrapper.find(UpdateUserForm);
    expect(checkEmailForm.exists()).toBeTruthy();

    // fire submit
    expect(initialProps.updateUser).not.toHaveBeenCalled();
    checkEmailForm.props().onSubmit();

    // check callback
    expect(initialProps.updateUser).toHaveBeenCalled();
  });

  // describe('RegisterView view tests', () => {
    it('should render profile information', () => {
      const wrapper = getUserView(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      const jestProfileInformationElement = wrapper
        .findWhere(n => n.props().id === jestProfileInformation);
      expect(jestProfileInformationElement.exists()).toBeTruthy();

      // check heading and paragraph
      const heading = jestProfileInformationElement.find(Heading);
      const paragraph = jestProfileInformationElement.find(Paragraph);

      expect(heading.exists()).toBeTruthy();
      expect(paragraph.exists()).toBeTruthy();
    });
  // });

    it('should render logged in since if date available', () => {
      const wrapper = getUserView(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      const jestLoggedInSinceElement = wrapper
        .findWhere(n => n.props().id === jestLoggedInSince);
      expect(jestLoggedInSinceElement.exists()).toBeTruthy();

      const formatedDate = getDefaultFormatedDate(initialProps.authMeta.loggedInSince);
      expect(jestLoggedInSinceElement.text()).toEqual(formatedDate);
    });

    it('should render unknown logged in since if not date available', () => {
      const wrapper = getUserView({
        ...initialProps,
        authMeta: {
          ...initialProps.authMeta,
          loggedInSince: null,
        }
      });
      expect(wrapper.exists()).toBeTruthy();

      const jestLoggedInSinceElement = wrapper
        .findWhere(n => n.props().id === jestLoggedInSince);
      expect(jestLoggedInSinceElement.exists()).toBeTruthy();

      expect(jestLoggedInSinceElement.text()).toEqual('unknown');
    });

    it('should render auto log in if enabled', () => {
      const wrapper = getUserView(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      const jestAutoLoggedInElement = wrapper
        .findWhere(n => n.props().id === jestAutoLoggedIn);

      expect(jestAutoLoggedInElement.exists()).toBeTruthy();

      expect(jestAutoLoggedInElement.text()).toEqual('enabled');
    });

    it('should render unknown logged in since if not date available', () => {
      const wrapper = getUserView({
        ...initialProps,
        authMeta: {
          ...initialProps.authMeta,
          remember: false,
        }
      });
      expect(wrapper.exists()).toBeTruthy();

      const jestAutoLoggedInElement = wrapper
        .findWhere(n => n.props().id === jestAutoLoggedIn);
      expect(jestAutoLoggedInElement.exists()).toBeTruthy();

      expect(jestAutoLoggedInElement.text()).toEqual('disabled');
    });

    it('should render privacy link', () => {
      const wrapper = getUserView(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      const jestPrivacyLinkElement = wrapper
        .findWhere(n => n.props().id === jestPrivacyLink)
        .find(Link);

      expect(jestPrivacyLinkElement.exists()).toBeTruthy();
      expect(jestPrivacyLinkElement.props().to).toEqual(Paths.PRIVACY);
    });

    it('should handle logOutUser', () => {
      const wrapper = getUserView(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      const jestLogOutUserElement = wrapper
        .findWhere(n => n.props().id === jestLogOutUser);
      expect(jestLogOutUserElement.exists()).toBeTruthy();

      expect(initialProps.logOutUser).not.toHaveBeenCalled();

      // simulate click
      jestLogOutUserElement.at(0).simulate('click');

      expect(initialProps.logOutUser).toHaveBeenCalled();
    });

    it('should call getUserInfo if not loading, no error and never been called before', () => {
      expect(initialProps.getUserInfo).not.toHaveBeenCalled();
      const wrapper = getUserView({
        ...initialProps,
        getUserInfoRequest: {
          ...initialProps.getUserInfoRequest,
          loading: false,
          lastError: null,
          lastFetch: null,
        },
      });
      expect(wrapper.exists()).toBeTruthy();

      expect(initialProps.getUserInfo).toHaveBeenCalled();
    });
});
