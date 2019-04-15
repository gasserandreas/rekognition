import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import Footer, { __testables__ } from '../Footer';

import { Colors } from '../../styles';

const {
  StyledFooter,
  getColor,
  getBackgroundColor,
  getWithSidebar,
  getLinkColor,
} = __testables__;

describe('Footer test suite', () => {
  it('Footer should render correctly', () => {
    const wrapper = mount(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('footer')).toHaveStyleRule('color', Colors.ColorsPalette.TextFaded);
  });

  it('test consistent styling', () => {
    expect(toJson(shallow(<StyledFooter />)))
      .toMatchSnapshot();
  });

  it('Footer should render with sidebar prop enabled', () => {
    const wrapper = mount(<Footer withSidebar={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(shallow(<StyledFooter withSidebar={true} />)))
      .toMatchSnapshot();
  });

  it('Footer should render with alternative Color', () => {
    const wrapper = mount(<Footer alternativeColor={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();

    expect(toJson(shallow(<StyledFooter alternativeColor={true} />)))
      .toMatchSnapshot();
  });

  it('getWithSidebar should return not return empty string if withSidebar is set', () => {
    expect(getWithSidebar({ withSidebar: true })).not.toEqual('');
  });

  it('getColor should return color', () => {
    expect(getColor({ alternativeColor: false }))
      .toEqual(Colors.ColorsPalette.TextFaded);

      expect(getColor({ alternativeColor: true }))
      .toEqual(Colors.ColorsPalette.White);
  });

  it('getBackgroundColor should return color', () => {
    expect(getBackgroundColor({ alternativeColor: false }))
      .toEqual('inherit');

      expect(getBackgroundColor({ alternativeColor: true }))
      .toEqual(Colors.ColorsPalette.Background);
  });

  it('getLinkColor should return color', () => {
    expect(getLinkColor({ alternativeColor: false }))
      .toEqual(Colors.Neutrals.MidDark);

      expect(getLinkColor({ alternativeColor: true }))
      .toEqual(Colors.ColorsPalette.White);
  });
});
