import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Attribute from '../Attribute';

describe('Image Detail Attribute', () => {
  const initialProps = {
    attribute: {
      name: 'Test Name',
      confidence: 50,
      value: 'Test Value',
    },
    showConfidence: false,
    boldLabel: true,
  };

  const getAttribute = props => shallow(<Attribute {...props} />);

  it('should render', () => {
    const wrapper = getAttribute
  });
});
