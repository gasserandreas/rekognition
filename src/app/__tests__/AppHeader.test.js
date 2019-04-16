/* global testUtils */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';

import AppHeaderWithRouter, { __testables__ } from '../AppHeader';
import Header from '../../ui/Header';

const { AppHeader, shouldShowPreviousButton } = __testables__;

describe('AppFooter test suite', () => {
  const getWrapper = (props) => mount(<MemoryRouter>
    <AppHeaderWithRouter
      isAuthenticated={true}
      {...props} 
    />
  </MemoryRouter>);

  const getAppHeader = (props = {}) => {
    const wrapper = getWrapper(props);
    const appHeader = wrapper.find(AppHeader);
    return appHeader || null;
  };

  it('should render AppHeader and pass props', () => {
    const initialProps = {
      isAuthenticated: true,
      username: 'test user',
    };

    const appHeader = getAppHeader(initialProps);

    expect(appHeader).toBeTruthy();

    // get Header children
    const header = appHeader.find(Header);
    expect(header).toBeTruthy();

    // check for username props
    const props = header.props();
    expect(props.username).toEqual(initialProps.username);
    expect(props.isAuthenticated).toEqual(initialProps.isAuthenticated);
    expect(props.showPreviousButton).not.toBeUndefined();
  });

  it('should return AppHeader component wrapped in router', () => {
    const appHeader = getAppHeader();
    const props = appHeader.props();
    
    expect(props.location).toBeTruthy();
    expect(props.match).toBeTruthy();
    expect(props.history).toBeTruthy();
  });

  it('should go to home on onGoToPrevious callback', () => {
    // mock react-router-dom history props
    const history = {
      push: jest.fn(),
      location: {
        pathname: '',
      },
    };

    const initialProps = {
      history,
      isAuthenticated: true,
    }

    const wrapper = mount(<MemoryRouter>
      <AppHeader {...initialProps} />
    </MemoryRouter>);
    const appHeader = wrapper.find(AppHeader);
    const header = appHeader.find(Header);

    // check for onGoToPrevious
    const props = header.props();

    expect(props.onGoToPrevious).not.toBeUndefined();
    // fire props method
    header.props().onGoToPrevious();

    expect(history.push).toHaveBeenCalled();
  });

  it('should handle shouldShowPreviousButton', () => {
    expect(shouldShowPreviousButton('/dummy')).toBeTruthy();
    expect(shouldShowPreviousButton('/')).toBeFalsy();
  });
});
