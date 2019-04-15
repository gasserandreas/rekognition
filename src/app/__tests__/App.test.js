/* global testUtils */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Grommet } from 'grommet';

import { mount } from 'enzyme';

import App from '../App';
import AppFooter from '../AppFooter';
import AppHeader from '../AppHeader';
import AppMessage from '../AppMessage';
import PrivateRoute from '../PrivateRoute';

import ImagesContainer from '../../images/list/Container';

import { Theme } from '../../styles';
import * as Paths from '../../paths';

describe('App test suite', () => {
  const initialState = {
    auth: {
      username: 'Test',
      meta: {
        loggedIn: true,
      },
    },
    application: {
      message: {
        show: false,
        text: '',
        title: '',
        showRefresh: false,
      },
    },
    images: {
      byId: {},
      ids: [],
    },
  };

  const mockedData = {
    isAuthenticated: true,
    username: 'Test user',
    message: {
      show: false,
      text: '',
      title: '',
      showRefresh: false,
    },
  };

  const getApp = (props, initialPath = '/random') => {
    const router = mount(<MemoryRouter initialEntries={[ initialPath ]}>
      <App
        loadApplication={jest.fn()}
        {...props}
      />
    </MemoryRouter>)
    return router;
  }

  it('should render', () => {
    const wrapper = getApp(mockedData);
    expect(wrapper).toBeTruthy();

    // should init with Grommet
    const grommet = wrapper.find(Grommet);
    expect(grommet).toBeTruthy();

    expect(grommet.props().theme).toEqual(Theme);

    const appMessage = wrapper.find(AppMessage);
    const appHeader = wrapper.find(AppHeader);
    const appFooter = wrapper.find(AppFooter);

    // should consits with message, header and footer
    expect(appMessage).toBeTruthy();
    expect(appHeader).toBeTruthy();
    expect(appFooter).toBeTruthy();

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

  it('should load application on start', () => {
    const loadApplication = jest.fn();

    const wrapper = getApp({
      ...mockedData,
      loadApplication,
    });

    expect(wrapper).toBeTruthy();
    expect(loadApplication).toHaveBeenCalled();
  });

  describe('routing test suite', () => {
    const getPrivatePaths = (path) => {
      const routes = getApp(mockedData).find(PrivateRoute);
      console.log('ROUTES');
      console.log(routes);

      return routes.filter((route) => {
        const routePath = route.props().path;
        return routePath === path;
      });
    };

    it('should have route configuration for IMAGES', () => {
      // const wrapper = getApp(mockedData);
      // const privatePaths = wrapper.find(PrivateRoute);
      const imagesRoute = getPrivatePaths(Paths.IMAGES);

      expect(imagesRoute.props().component).toBeInstanceOf(ImagesContainer);

      // check for IMAGES
      // expect(getPrivatePaths)
    });

    // it('should render ImagesContainer for IMAGES path', () => {
    //   const wrapper = getApp(mockedData, Paths.IMAGES);
    //   expect(wrapper).toBeTruthy();

    //   jest.mock('../../images/list/Container', ()  => jest.fn());

    //   console.log(ImagesContainer);
    // });
  });
});