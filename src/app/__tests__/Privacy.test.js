import React from 'react';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';

import Privacy from '../Privacy';

describe('Privacy test suite', () => {
  const getPrivacy = (props) => mount(
    <MemoryRouter>
      <Privacy />
    </MemoryRouter>
  );

  it('should render', () => {
    const wrapper = getPrivacy();
    expect(wrapper).toBeTruthy();
  });
});
