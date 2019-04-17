/* global testUtils */
import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { mount } from 'enzyme';

import NotFound from '../NotFound';

describe('NotFound test suite', () => {
  const initialProps = {
    location: {
      pathname: '/pathname',
    },
  };

  const getNotFound = (props) => mount(
    <NotFound
      {...initialProps}
    />
  );

  it('should render NotFound', () => {
    const wrapper = getNotFound();
    expect(wrapper).toBeTruthy();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
