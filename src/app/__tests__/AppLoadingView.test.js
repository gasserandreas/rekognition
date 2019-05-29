import React from 'react';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { shallow } from 'enzyme';

import AppLoadingView from '../AppLoadingView';

describe('AppLoadingView test suite', () => {
  const getAppLoadingView = props => shallow(<AppLoadingView {...props} />);

  it('should render', () => {
    const wrapper = getAppLoadingView();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render consistently', () => {
    const wrapper = getAppLoadingView();
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});
