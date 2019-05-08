import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { MemoryRouter } from 'react-router-dom';

import Header, { __testables__ } from '../Header';

const { StyledPreviousButton, StyledUserProfile } = __testables__;

describe('Header test suite', () => {
  const getHeader = (props = {}) => {
    const wrapper = mount(
      <MemoryRouter>
        <Header isAuthenticated={false} {...props} />
      </MemoryRouter>,
    );
    const header = wrapper.find(Header);
    return header;
  };

  it('should render correctly', () => {
    const wrapper = getHeader();
    expect(toJson(wrapper)).toMatchSnapshot();

    // should not render previous button and user profile
    expect(wrapper.find(StyledPreviousButton).exists()).toBeFalsy();
    expect(wrapper.find(StyledUserProfile).exists()).toBeFalsy();
  });

  it('should use empty onGoPrevious prop', () => {
    const wrapper = getHeader();
    expect(wrapper.props().onGoToPrevious).toBeInstanceOf(Function);
  });

  it('should callback on got to previous click', () => {
    const callback = jest.fn();
    const wrapper = getHeader({
      isAuthenticated: true,
      onGoToPrevious: callback,
    });

    expect(wrapper).toBeTruthy();

    const goToPrevious = wrapper.find(StyledPreviousButton);

    expect(callback).not.toHaveBeenCalled();
    goToPrevious.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

  it('should pass / show username', () => {
    const username = 'Test user';
    const wrapper = getHeader({
      username,
      isAuthenticated: true,
    });
    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.find(username)).toBeTruthy();
  });

  it('should render is authenticated', () => {
    const wrapper = getHeader({
      isAuthenticated: true,
    });

    expect(toJson(wrapper)).toMatchSnapshot();

    // should render previous button and user profile
    expect(wrapper.find(StyledPreviousButton).length).toEqual(1);
    expect(wrapper.find(StyledUserProfile).length).toEqual(1);
  });
});
