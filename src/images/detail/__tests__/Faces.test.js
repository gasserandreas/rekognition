import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { Paragraph } from 'grommet';

import Faces, { __testables__ } from '../Faces';
import Attribute, { StyledAttrLabel } from '../Attribute';
import Label from '../Label';

const { Emotions, Face } = __testables__;

describe('Faces test suite', () => {
  const mockedFace = {
    id: 'd4dd0b74-3e17-4835-840b-031d658dba04',
    position: {
      height: 0.23437920212745667,
      left: 0.554311215877533,
      top: 0.14555378258228302,
      width: 0.1378326714038849,
    },
    emotions: [
      {
        confidence: 63.303672790527344,
        name: 'CALM',
      },
      {
        confidence: 14.506290435791016,
        name: 'SAD',
      },
      {
        confidence: 9.167359352111816,
        name: 'ANGRY',
      },
    ],
    attributes: [
      {
        confidence: 96.67288208007812,
        name: 'eyesOpen',
        value: 'true',
      },
      {
        confidence: 95.66466522216797,
        name: 'gender',
        value: 'Male',
      },
    ],
    age: {
      high: 43,
      low: 26,
    },
  };

  const initialProps = {
    faces: [mockedFace],
    selectedFace: mockedFace,
    onFaceClick: jest.fn(),
  };

  const alternativeId = 'a4dd0b74-3e17-4835-840b-031d658dba20';

  const getFaces = props => mount(<Faces {...props} />);

  afterEach(() => {
    initialProps.onFaceClick.mockClear();
  });

  it('should render faces', () => {
    const wrapper = getFaces(initialProps);
    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find(Face).exists()).toBeTruthy();
    expect(wrapper.find(Paragraph).exists()).toBeTruthy();
  });

  it('should render consistently', () => {
    const wrapper = getFaces(initialProps);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Faces: Faces component test suite', () => {
    it('should render faces array', () => {
      const wrapper = getFaces({
        ...initialProps,
        faces: [
          mockedFace,
          {
            ...mockedFace,
            id: alternativeId,
          },
        ],
      });
      expect(wrapper.exists()).toBeTruthy();

      const faceComponents = wrapper.find(Face);
      expect(faceComponents.length).toEqual(2);
    });

    it('should set selected for selected face', () => {
      const props = {
        ...initialProps,
        faces: [
          mockedFace,
          {
            ...mockedFace,
            id: alternativeId,
          },
        ],
        selectedFace: mockedFace,
      };

      const wrapper = getFaces(props);
      expect(wrapper.exists()).toBeTruthy();

      const faceComponents = wrapper.find(Face);
      // find selected face
      const selectedFace = faceComponents.filterWhere(n => n.props().selected);
      expect(selectedFace.exists()).toBeTruthy();

      expect(selectedFace.props().face.id).toEqual(props.selectedFace.id);
    });

    it('should handle face onClick', () => {
      const wrapper = getFaces(initialProps);
      expect(wrapper.exists()).toBeTruthy();

      // get face component
      const faceComponent = wrapper.find(Face);
      expect(faceComponent.exists()).toBeTruthy();

      expect(initialProps.onFaceClick).not.toHaveBeenCalled();

      // fire click
      faceComponent.simulate('click');
      expect(initialProps.onFaceClick).toHaveBeenCalled();
      expect(initialProps.onFaceClick).toHaveBeenCalledWith(mockedFace);
    });
  });

  describe('Faces: Face component test suite', () => {
    const getFace = props => shallow(<Face number={1} onClick={() => {}} face={mockedFace} {...props} />);

    it('should render', () => {
      const wrapper = getFace();
      expect(wrapper.exists()).toBeTruthy();

      // check for attributes
      const attributes = wrapper.find(Attribute);

      // should have +1 attributes due age attribute
      expect(attributes.length).toEqual(mockedFace.attributes.length + 1);

      // check for emotions
      const emotions = wrapper.find(Emotions);
      expect(emotions.exists()).toBeTruthy();
    });

    it('should convert age to age attribute', () => {
      const { age } = mockedFace;

      const wrapper = getFace();
      expect(wrapper.exists()).toBeTruthy();

      const ageAttribute = wrapper.find(Attribute).filterWhere(n => n.props().attribute.name === 'age');
      expect(ageAttribute.exists()).toBeTruthy();

      const { value } = ageAttribute.props().attribute;
      expect(value.includes(age.low)).toBeTruthy();
      expect(value.includes(age.high)).toBeTruthy();
    });

    it('should filter out brightness and sharpness attributes', () => {
      const filteredAttributeNames = ['sharpness', 'brightness'];

      // create new attributes props
      const newAttributes = [
        ...mockedFace.attributes,
        ...filteredAttributeNames.map(name => ({
          name,
          confidence: 100,
          value: name,
        })),
      ];
      const wrapper = getFace({
        face: {
          ...mockedFace,
          attributes: newAttributes,
        },
      });
      expect(wrapper.exists()).toBeTruthy();

      const attributes = wrapper.find(Attribute);
      expect(attributes.exists()).toBeTruthy();
      expect(attributes.length).toEqual(
        newAttributes.length
        - filteredAttributeNames.length // remove filtered attributes
          + 1, // add age attributes
      );

      const attributeNames = attributes.map(attribute => attribute.props().attribute.name);

      // check for missing filtered attribute names
      filteredAttributeNames.forEach((filteredAttribute) => {
        expect(attributeNames.includes(filteredAttribute)).toBeFalsy();
      });
    });

    it('should render consistently', () => {
      const wrapper = getFace();
      expect(toJson(wrapper.dive())).toMatchSnapshot();
    });

    it('should render consistently if selected', () => {
      const wrapper = getFace({ selected: true });
      expect(toJson(wrapper.dive())).toMatchSnapshot();
    });
  });

  describe('Faces: Emotions component test suite', () => {
    const getEmotions = props => shallow(<Emotions faceId={mockedFace.id} emotions={mockedFace.emotions} {...props} />);

    it('should render', () => {
      const wrapper = getEmotions();
      expect(wrapper.exists()).toBeTruthy();

      expect(wrapper.find(StyledAttrLabel).exists()).toBeTruthy();
      expect(wrapper.find(Label).exists()).toBeTruthy();
    });

    it('should render consistently', () => {
      const wrapper = getEmotions();
      expect(toJson(wrapper.dive())).toMatchSnapshot();
    });

    it('should sort emotions by confidence', () => {
      const sortedEmotionNames = mockedFace.emotions
        .sort((a, b) => (a.confidence < b.confidence ? 1 : -1))
        .map(emotion => emotion.name);

      const wrapper = getEmotions();
      expect(wrapper.exists()).toBeTruthy();

      const labels = wrapper.find(Label);
      expect(labels.exists()).toBeTruthy();

      const emotionLabelNames = labels.map(label => label.props().label.name);
      expect(sortedEmotionNames).toEqual(emotionLabelNames);
    });
  });
});
