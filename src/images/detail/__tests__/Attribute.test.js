import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Attribute, { __testables__, StyledAttrLabel } from '../Attribute';

const { StyledConfidence, StyledAttrContent, getFontWeith } = __testables__;

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
    const wrapper = getAttribute(initialProps);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should not render confidence if set', () => {
    const wrapper = getAttribute({
      ...initialProps,
      showConfidence: true,
    });
    expect(wrapper.exists()).toBeTruthy();

    const styledConfidence = wrapper.find(StyledConfidence);
    expect(styledConfidence.exists()).toBeTruthy();
  });

  describe('Attribute styles test suite', () => {
    it('Attribute should render consistently', () => {
      const wrapper = getAttribute(initialProps);
      expect(toJson(wrapper.dive())).toMatchSnapshot();
    });

    it('StyledAttrLabel should render consistently', () => {
      const attrLabel = shallow(<StyledAttrLabel />);
      expect(toJson(attrLabel)).toMatchSnapshot();
    });

    it('StyledAttrLabel should render consistently with bold styles', () => {
      const attrLabel = shallow(<StyledAttrLabel bold />);
      expect(toJson(attrLabel)).toMatchSnapshot();
    });

    it('StyledConfidence should render consistently', () => {
      const attrLabel = shallow(<StyledConfidence />);
      expect(toJson(attrLabel)).toMatchSnapshot();
    });

    it('StyledAttrContent should render consistently', () => {
      const attrLabel = shallow(<StyledAttrContent />);
      expect(toJson(attrLabel)).toMatchSnapshot();
    });

    it('getFontWeith should return bold label', () => {
      expect(getFontWeith({ bold: true })).toEqual(600);
      expect(getFontWeith({ bold: false })).toEqual(400);
      expect(getFontWeith({})).toEqual(400);
    });
  });
});
