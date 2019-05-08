import React from 'react';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { mount } from 'enzyme';

import AppMessage from '../AppMessage';
import Button from '../../ui/form/Button';

describe('AppMessage test suite', () => {
  let windowLoactionReloadOrg;

  beforeAll(() => {
    windowLoactionReloadOrg = window.location.reload;
    window.location.reload = jest.fn();
  });

  afterAll(() => {
    window.location.reload = windowLoactionReloadOrg;
  });

  const initialProps = {
    message: {
      show: true,
      text: 'test text',
      title: 'test title',
      showRefresh: true,
    },
  };

  it('should render AppMessage', () => {
    const wrapper = mount(<AppMessage {...initialProps} />);
    expect(wrapper).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render AppMessage without refresh text', () => {
    const props = {
      ...initialProps,
      showRefresh: false,
    };
    const wrapper = mount(<AppMessage {...props} />);
    expect(wrapper).toBeTruthy();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should attach window reload to button', () => {
    const wrapper = mount(<AppMessage {...initialProps} />);

    const button = wrapper.find(Button);
    expect(button).toBeTruthy();

    button.simulate('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
