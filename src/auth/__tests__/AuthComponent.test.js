import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { MemoryRouter } from 'react-router-dom';

import { AuthHeader, AuthFooter } from '../AuthComponents';

describe('AuthComponent test suite', () => {
  describe('AuthHeader test suite', () => {
    it('should render with children', () => {
      const children = <p>children</p>;
      const wrapper = mount(<AuthHeader>{children}</AuthHeader>);
      expect(wrapper).toBeTruthy();

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('AuthFooter test suite', () => {
    const getFooter = (props) => {
      const wrapper = mount(
        <MemoryRouter>
          <AuthFooter {...props} />
        </MemoryRouter>,
      );
      return wrapper.find(AuthFooter);
    };

    it('should render with children', () => {
      const href = 'http://www.google.com';
      const children = <p>children</p>;

      const wrapper = getFooter({ href, children });
      expect(wrapper).toBeTruthy();

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
