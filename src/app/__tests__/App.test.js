import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Grommet } from 'grommet';

import { mount } from 'enzyme';

import App from '../App';
import AppFooter from '../AppFooter';
import AppHeader from '../AppHeader';
import AppMessage from '../AppMessage';
import PrivateRoute from '../PrivateRoute';
import AppLoadingView from '../AppLoadingView';

import { Theme } from '../../styles';

describe('App test suite', () => {
  const mockedData = {
    isAuthenticated: true,
    username: 'Test user',
    didLoad: true,
    message: {
      show: false,
      text: '',
      title: '',
      showRefresh: false,
    },
  };

  const getApp = (props, initialPath = '/random') => {
    const router = mount(
      <MemoryRouter initialEntries={[initialPath]}>
        <App {...props} />
      </MemoryRouter>,
    );
    return router;
  };

  it('should render', () => {
    const wrapper = getApp(mockedData);
    expect(wrapper.exists()).toBeTruthy();

    // should init with Grommet
    const grommet = wrapper.find(Grommet);
    expect(grommet.exists()).toBeTruthy();

    expect(grommet.props().theme).toEqual(Theme);

    const appMessage = wrapper.find(AppMessage);
    const appHeader = wrapper.find(AppHeader);
    const appFooter = wrapper.find(AppFooter);

    // should consists with message, header and footer
    expect(appMessage.exists()).toBeTruthy();
    expect(appHeader.exists()).toBeTruthy();
    expect(appFooter.exists()).toBeTruthy();

    // check for props
    expect(appMessage.props().message).toEqual(mockedData.message);

    expect(appHeader.props().username).toEqual(mockedData.username);
    expect(appHeader.props().isAuthenticated).toEqual(mockedData.isAuthenticated);

    // should pass isAuthenticated to PrivateRoute
    const privateRoutes = wrapper.find(PrivateRoute);
    privateRoutes.forEach((privateRoute) => {
      expect(privateRoute.props().isAuthenticated).toEqual(mockedData.isAuthenticated);
    });
  });

  it('should render AppLoadingView if didLoad is not set', () => {
    const didLoad = false;

    const wrapper = getApp({
      ...mockedData,
      didLoad,
    });

    expect(wrapper.exists()).toBeTruthy();

    // find app loading view but no router
    const appLoadingView = wrapper.find(AppLoadingView);
    const appRoutes = wrapper.find('#jestAppRoutes');

    expect(appLoadingView.exists()).toBeTruthy();
    expect(appRoutes.exists()).toBeFalsy();
  });
});
