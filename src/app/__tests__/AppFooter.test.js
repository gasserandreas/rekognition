import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';

import AppFooterWithRouter, { __testables__ } from '../AppFooter';
import * as Paths from '../../paths';

const { AppFooter, isWithSidebar, isAlternativeColor } = __testables__;

describe('AppFooter test suite', () => {
  const getWrapper = (props = {}) => mount(
    <MemoryRouter>
      <AppFooterWithRouter {...props} />
    </MemoryRouter>,
  );

  const getAppFooter = (props = {}) => {
    const wrapper = getWrapper(props);
    const appFooter = wrapper.find(AppFooter);
    return appFooter || null;
  };

  it('should render AppFooter', () => {
    const footer = getAppFooter();
    expect(footer).toBeTruthy();
  });

  it('should return Footer component wrapped in router', () => {
    const footer = getAppFooter();
    const props = footer.props();

    expect(props.location).toBeTruthy();
    expect(props.match).toBeTruthy();
    expect(props.history).toBeTruthy();
  });

  it('should handle isWithSidebar', () => {
    expect(isWithSidebar('/dummy')).toBeFalsy();
    expect(isWithSidebar(Paths.GET_IMAGES_DETAIL(''))).toBeTruthy();
  });

  it('should handle isAlternativeColor', () => {
    expect(isAlternativeColor('/dummy')).toBeFalsy();
    expect(isAlternativeColor(Paths.LOGIN)).toBeTruthy();
    expect(isAlternativeColor(Paths.REGISTER)).toBeTruthy();
  });
});
