import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { getThumbImageSrc, getDefaultFormatedDate } from '../../../util/util';

import listImages from '../__data__/listImages.json';

import ImageList, { __testables__ } from '../ImageList';

const {
  StyledImageAttr,
  ImageAttr,
  StyledImage,
  StyledListItem,
  ListItem,
  ListItemAdd,
  StyledImageList,
} = __testables__;

describe('ImageList test suite', () => {
  const initialProps = {
    history: {
      push: jest.fn(),
    },
    images: listImages,
    addImageRequest: {
      loading: false,
      error: null,
    },
    onImageClick: jest.fn(),
  };

  const getImageList = props => mount(<ImageList {...initialProps} {...props} />);

  afterEach(() => {
    initialProps.history.push.mockClear();
    initialProps.onImageClick.mockClear();
  });

  describe('ImageList component test suite', () => {
    it('should render', () => {
      const wrapper = getImageList();
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should render ListItemAdd if loading', () => {
      const wrapper = getImageList({
        ...initialProps,
        addImageRequest: {
          ...initialProps.addImageRequest,
          loading: true,
        },
      });
      expect(wrapper.exists()).toBeTruthy();

      const listItemAdd = wrapper.find(ListItemAdd);
      expect(listItemAdd.exists()).toBeTruthy();
    });

    it('should render all images as ListItem', () => {
      const wrapper = getImageList();
      expect(wrapper.exists()).toBeTruthy();

      const listItem = wrapper.find(ListItem);
      expect(listItem.exists()).toBeTruthy();
      expect(listItem.length).toEqual(initialProps.images.length);

      // check image prop for first image
      const props = listItem.at(0).props();
      expect(props.image).toEqual(initialProps.images[0]);
    });

    it('should handle onImageClick', () => {
      const wrapper = getImageList();
      expect(wrapper.exists()).toBeTruthy();

      const listItem = wrapper.find(ListItem);
      expect(listItem.exists()).toBeTruthy();

      expect(initialProps.onImageClick).not.toHaveBeenCalled();

      // fire on click
      listItem.at(0).simulate('click');

      expect(initialProps.onImageClick).toHaveBeenCalled();
    });

    it('should render consistently', () => {
      const wrapper = shallow(<StyledImageList />);
      expect(toJson(wrapper.dive())).toMatchSnapshot();
    });
  });

  describe('ListItemAdd test suite', () => {
    it('should render consistently', () => {
      const wrapper = shallow(<ListItemAdd />);
      expect(toJson(wrapper.dive())).toMatchSnapshot();
    });
  });

  describe('ListItem test suite', () => {
    const getListItem = props => mount(
      <ListItem
        image={initialProps.images[0]}
        onClick={jest.fn()}
        {...props}
      />,
    );

    it('should render', () => {
      const wrapper = getListItem();
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should pass image path to image', () => {
      const wrapper = getListItem();
      expect(wrapper.exists()).toBeTruthy();

      const image = wrapper.find(StyledImage);
      expect(image.exists()).toBeTruthy();

      const imagePath = getThumbImageSrc(initialProps.images[0].path);
      expect(image.props().src).toEqual(imagePath);
    });

    it('should render consistently', () => {
      const wrapper = shallow(<StyledListItem />);
      expect(wrapper.dive()).toMatchSnapshot();
    });
  });

  describe('ImageAttr test suite', () => {
    const getImageAttr = (props) => {
      const image = initialProps.images[0];
      const { meta, created } = image;
      const { numberOfFaces, numberOfLabels } = meta;
      return mount(
        <ImageAttr
          created={created}
          numberOfFaces={numberOfFaces}
          numberOfLabels={numberOfLabels}
          {...props}
        />,
      );
    };

    it('should render', () => {
      const wrapper = getImageAttr();
      expect(wrapper.exists()).toBeTruthy();
    });

    it('should render date time label', () => {
      const wrapper = getImageAttr();
      expect(wrapper.exists()).toBeTruthy();

      const dateTimeLabel = wrapper.find('#jestDateTimeLabel');
      expect(dateTimeLabel.exists()).toBeTruthy();

      const image = initialProps.images[0];
      const dateTime = getDefaultFormatedDate(image.created);
      expect(dateTimeLabel.text()).toEqual(dateTime);
    });

    it('should render consistently', () => {
      const wrapper = shallow(<StyledImageAttr />);
      expect(wrapper.dive()).toMatchSnapshot();
    });
  });
});
