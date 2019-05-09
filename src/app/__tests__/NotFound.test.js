import React from 'react';
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

  const getNotFound = props => mount(<NotFound {...initialProps} {...props} />);

  it('should render NotFound', () => {
    const wrapper = getNotFound();
    expect(wrapper).toBeTruthy();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
