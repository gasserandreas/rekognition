/* globals testUtils */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import DetailView, { __testables__ } from '../DetailView';
import Labels from '../Labels';
import Label from '../Label';
import Faces, { Face } from '../Faces';
import { Attribute } from '../Attribute';
import Image from '../Image';
import AddImageButton from '../../AddImageButton';

import * as Paths from '../../../paths';

import imageJson from '../__data__/image.json';
import labelsJson from '../__data__/labels.json';
import facesJson from '../__data__/faces.json';
import selectedFaceJson from '../__data__/selectedFace.json';
import selectedLabelJson from '../__data__/selectedLabel.json';

const {
  StyledBackButton,
  StyledHeading,
  StyledImageBoxContainer,
  StyledImageBox,
  StyledDataBox,
  StyledScrollableData,
  StyledView,
  convertMetaToAttributes,
} = __testables__;

const { createMockStore } = testUtils;

describe('DetailView test suite', () => {
  const initialProps = {
    history: {
      push: jest.fn(),
    },
    image: imageJson,
    faces: facesJson,
    labels: labelsJson,
    selectedFace: selectedFaceJson,
    selectedLabel: selectedLabelJson,
    getImage: jest.fn(),
    getImageRequest: {
      error: null,
      loading: false,
    },
  };

  const mockStore = createMockStore();

  afterEach(() => {
    // clear mocks
    initialProps.history.push.mockClear();
    initialProps.getImage.mockClear();
  });

  const getDetailView = (props) => {
    const store = mockStore();
    const provider = mount(
      <Provider store={store}>
        <DetailView {...initialProps} {...props} />
      </Provider>,
    );

    const wrapper = provider.find(DetailView);
    return wrapper;
  };

  it('should render', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render AddImageButton', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const addImageButton = wrapper.find(AddImageButton);
    expect(addImageButton.exists()).toBeTruthy();
  });

  it('should not render Image component if no image id is provided', () => {
    const wrapper = getDetailView({
      image: {},
    });
    expect(wrapper.exists()).toBeTruthy();

    const image = wrapper.find(Image);
    expect(image.exists()).toBeFalsy();
  });

  it('should render image with props', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const image = wrapper.find(Image);
    expect(image.exists()).toBeTruthy();

    const props = image.props();
    expect(props.image).toEqual(initialProps.image);
    expect(props.selectedLabel).toEqual(initialProps.selectedLabel);
    expect(props.selectedFace).toEqual(initialProps.selectedFace);
  });

  it('should render back button', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const backButton = wrapper.find(StyledBackButton);
    expect(backButton.exists()).toBeTruthy();
  });

  it('should render image attributes', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const imageAttributesWrapper = wrapper.find('#jestImageAttributes');
    expect(imageAttributesWrapper.exists()).toBeTruthy();

    const metaAttributes = convertMetaToAttributes(initialProps.image.meta);

    const attributes = imageAttributesWrapper.find(Attribute);
    expect(attributes.length).toEqual(metaAttributes.length + 1);

    const attributeNames = ['Uploaded', 'Type', 'Size', 'Dimension', 'Density'];
    attributes.forEach((attribute) => {
      expect(attributeNames.includes(attribute.props().attribute.name)).toBeTruthy();
    });
  });

  it('should render labels if not loading', () => {
    const wrapper = getDetailView({
      ...initialProps,
      getImageRequest: {
        ...initialProps.getImageRequest,
        loading: false,
      },
    });
    expect(wrapper.exists()).toBeTruthy();

    const labels = wrapper.find(Labels);
    expect(labels.exists()).toBeTruthy();

    const props = labels.props();
    expect(props.labels).toEqual(initialProps.labels);
    expect(props.selectedLabel).toEqual(initialProps.selectedLabel);
  });

  it('should render loading state for labels if loading', () => {
    const wrapper = getDetailView({
      ...initialProps,
      getImageRequest: {
        ...initialProps.getImageRequest,
        loading: true,
      },
    });
    expect(wrapper.exists()).toBeTruthy();

    const asyncContainer = wrapper.find('#jestLabelsAsyncContainer');
    expect(asyncContainer.exists()).toBeTruthy();

    const labels = wrapper.find(Labels);
    expect(labels.exists()).toBeFalsy();
  });

  it('should not load faces if number of faces is equal zero', () => {
    const wrapper = getDetailView({
      ...initialProps,
      faces: [],
    });
    expect(wrapper.exists()).toBeTruthy();

    const faces = wrapper.find('#jestFacesContainer');
    expect(faces.exists()).toBeFalsy();
  });

  it('should render faces if not loading', () => {
    const wrapper = getDetailView({
      ...initialProps,
      getImageRequest: {
        ...initialProps.getImageRequest,
        loading: false,
      },
    });
    expect(wrapper.exists()).toBeTruthy();

    const faces = wrapper.find(Faces);
    expect(faces.exists()).toBeTruthy();

    const props = faces.props();
    expect(props.faces).toEqual(initialProps.faces);
    expect(props.selectedFace).toEqual(initialProps.selectedFace);
  });

  it('should render loading state for faces if loading', () => {
    const wrapper = getDetailView({
      ...initialProps,
      getImageRequest: {
        ...initialProps.getImageRequest,
        loading: true,
      },
    });
    expect(wrapper.exists()).toBeTruthy();

    const asyncContainer = wrapper.find('#jestFacesAsyncContainer');
    expect(asyncContainer.exists()).toBeTruthy();

    const faces = wrapper.find(Faces);
    expect(faces.exists()).toBeFalsy();
  });

  it('should request image details if labels and faces are not set', () => {
    expect(initialProps.getImage).not.toHaveBeenCalled();

    const wrapper = getDetailView({
      ...initialProps,
      faces: [],
      labels: [],
    });
    expect(wrapper.exists()).toBeTruthy();

    expect(initialProps.getImage).toHaveBeenCalled();
    expect(initialProps.getImage).toHaveBeenCalledWith(initialProps.image.id);
  });

  it('should move to home view after new image upload', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const addImageButton = wrapper.find(AddImageButton);
    expect(addImageButton.exists()).toBeTruthy();

    expect(initialProps.history.push).not.toHaveBeenCalled();

    addImageButton.props().afterOnClick();
    expect(initialProps.history.push).toHaveBeenCalled();
  });

  it('should convert meta values to attributes', () => {
    const { meta } = initialProps.image;

    const attributes = convertMetaToAttributes(meta);
    expect(attributes).toEqual([
      {
        name: 'Type',
        value: 'jpeg',
      },
      {
        name: 'Size',
        value: '2.26 MB',
      },
      {
        name: 'Dimension',
        value: '4813px x 3209px',
      },
      {
        name: 'Density',
        value: '72 DPI',
      },
    ]);
  });

  it('should return empty array if no meta is provided', () => {
    expect(convertMetaToAttributes(undefined)).toEqual([]);
  });

  it('should filter out invalid image meta properties', () => {
    const meta = {
      ...initialProps.image.meta,
      size: 0,
      height: 0,
      density: 0,
    };

    const attributes = convertMetaToAttributes(meta);
    expect(attributes).toEqual([
      {
        name: 'Type',
        value: 'jpeg',
      },
    ]);
  });

  it('should pass face id to browser on face click', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const faces = wrapper.find(Face);
    expect(faces.exists()).toBeTruthy();

    expect(initialProps.history.push).not.toHaveBeenCalled();

    // click one face
    const face = faces.at(0);
    expect(face.exists()).toBeTruthy();

    face.simulate('click');

    expect(initialProps.history.push).toHaveBeenCalled();
  });

  it('should pass label id to browser on label click', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const labels = wrapper.find(Label);
    expect(labels.exists()).toBeTruthy();

    expect(initialProps.history.push).not.toHaveBeenCalled();

    // click one face
    const label = labels.at(2);
    expect(label.exists()).toBeTruthy();

    label.simulate('click');

    expect(initialProps.history.push).toHaveBeenCalled();
  });

  it('should go back on back button click', () => {
    const wrapper = getDetailView();
    expect(wrapper.exists()).toBeTruthy();

    const backButton = wrapper.find(StyledBackButton);
    expect(backButton.exists()).toBeTruthy();

    expect(initialProps.history.push).not.toHaveBeenCalled();

    backButton.simulate('click');
    expect(initialProps.history.push).toHaveBeenCalled();
    expect(initialProps.history.push).toHaveBeenCalledWith(Paths.HOME);
  });

  // check for styling
  it('should render StyledBackButton consistently', () => {
    const wrapper = shallow(<StyledBackButton />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledHeading consistently', () => {
    const wrapper = shallow(<StyledHeading />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledImageBoxContainer consistently', () => {
    const wrapper = shallow(<StyledImageBoxContainer />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledImageBox consistently', () => {
    const wrapper = shallow(<StyledImageBox />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledDataBox consistently', () => {
    const wrapper = shallow(<StyledDataBox />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledScrollableData consistently', () => {
    const wrapper = shallow(<StyledScrollableData />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });

  it('should render StyledView consistently', () => {
    const wrapper = shallow(<StyledView />);
    expect(toJson(wrapper.dive())).toMatchSnapshot();
  });
});
