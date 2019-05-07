import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Message, { MESSAGE_TYPES, __testables__ } from '../Message';

import { Colors } from '../../../styles';

const { StyledMessage } = __testables__;

it('Message should render correctly', () => {
  const wrapper = shallow(
    <Message>
      <p>Hello</p>
    </Message>,
  );
  expect(toJson(wrapper.dive())).toMatchSnapshot();
});

it('should render Message consistently', () => {
  const wrapper = shallow(<StyledMessage />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe('Message info styles test suite', () => {
  it('Message should render info styles', () => {
    const wrapper = shallow(
      <Message appearance={MESSAGE_TYPES.INFO}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('Message should render without border', () => {
    const wrapper = shallow(
      <Message appearance={MESSAGE_TYPES.INFO} border={false}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('Message should render without round corners', () => {
    const wrapper = shallow(
      <Message rounded={false}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});

describe('Message warning styles test suite', () => {
  it('Message should render warning styles', () => {
    const wrapper = shallow(
      <Message appearance={MESSAGE_TYPES.WARNING}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('Message should render without border', () => {
    const wrapper = shallow(
      <Message appearance={MESSAGE_TYPES.WARNING} border={false}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('Message should render without round corners', () => {
    const wrapper = shallow(
      <Message rounded={false}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});

describe('Message error styles test suite', () => {
  it('Message should render error styles', () => {
    const wrapper = shallow(
      <Message appearance={MESSAGE_TYPES.ERROR}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('Message should render without border', () => {
    const wrapper = shallow(
      <Message appearance={MESSAGE_TYPES.ERROR} border={false}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('Message should render without round corners', () => {
    const wrapper = shallow(
      <Message rounded={false}>
        <p>Hello</p>
      </Message>,
    );
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});

describe('Style helper methods test suite', () => {
  const { getColor, getBorderColor, getBackgroundColor } = __testables__;

  it('should handle getColor', () => {
    expect(getColor({ appearance: 'default' })).toEqual(Colors.ColorsPalette.Text);
    expect(getColor({ appearance: MESSAGE_TYPES.ERROR })).toEqual(Colors.ColorsPalette.TextInvers);
  });

  it('should handle getBackgroundColor', () => {
    expect(getBackgroundColor({ appearance: 'default' })).toEqual('inherit');
    expect(getBackgroundColor({ appearance: MESSAGE_TYPES.WARNING })).toEqual(Colors.Orange.Default);
    expect(getBackgroundColor({ appearance: MESSAGE_TYPES.ERROR })).toEqual(Colors.Red.Default);
  });

  it('should handle getBorderColor', () => {
    expect(getBorderColor({ appearance: 'default' })).toEqual(Colors.Neutrals.LightDark);
    expect(getBorderColor({ appearance: MESSAGE_TYPES.WARNING })).toEqual(Colors.Orange.Default);
    expect(getBorderColor({ appearance: MESSAGE_TYPES.ERROR })).toEqual(Colors.Red.Default);
  });
});
