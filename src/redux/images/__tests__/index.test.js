/* global it testUtils */
import reducer, * as reduxImages from '../index';
import * as util from '../util';
import * as reduxFaces from '../../faces';
import * as reduxLabels from '../../labels';

import GraphApi from '../../../util/GraphApi';

import listImagesJson from '../__data__/listImages.json';
import getImageJson from '../__data__/getImage.json';
import addImageJson from '../__data__/addImage.json';

const { __testables__ } = reduxImages;

jest.mock('../../../util/GraphApi');

describe('images simple action test suite', () => {
  const mockedData = {
    image: listImagesJson.data.listImage.items[0],
    images: listImagesJson.data.listImage.items,
  };

  it('should handle imagesAddNewImage', () => {
    expect(__testables__.imagesAddNewImage(mockedData.image)).toEqual({
      type: __testables__.IMAGES_ADD_NEW_IMAGE,
      payload: mockedData.image,
    });
  });

  it('should handle imagesAddImage', () => {
    expect(__testables__.imagesAddImage(mockedData.image)).toEqual({
      type: __testables__.IMAGES_ADD_IMAGE,
      payload: mockedData.image,
    });
  });

  it('should handle imagesAddImages', () => {
    const ids = [];
    const byId = {};

    mockedData.images.forEach((image) => {
      const { id } = image;
      ids.push(id);
      byId[id] = image;
    });

    expect(__testables__.imagesAddImages(mockedData.images)).toEqual({
      type: __testables__.IMAGES_ADD_IMAGES,
      payload: {
        byId,
        ids,
      },
    });
  });
});

describe('images complex action test suite', () => {
  const API = new GraphApi();
  const mockstore = testUtils.createMockStoreWithApi(API);

  const labelsAddLabelsDummyAction = testUtils.dummyTestAction('labelsAddLabelsMock');
  const facesAddFacesDummyAction = testUtils.dummyTestAction('facesAddFacesMock');

  let labelsAddLabelsMock;
  let facesAddFacesMock;

  beforeAll(() => {
    labelsAddLabelsMock = jest
      .spyOn(reduxLabels, 'labelsAddLabels')
      .mockImplementation(() => labelsAddLabelsDummyAction);

    facesAddFacesMock = jest.spyOn(reduxFaces, 'facesAddFaces').mockImplementation(() => facesAddFacesDummyAction);
  });

  afterAll(() => {
    labelsAddLabelsMock.mockRestore();
    facesAddFacesMock.mockRestore();
  });

  afterEach(() => {
    API.resetMocks();
  });

  describe('images addImage complex action test suite', () => {
    let readAsDataURLMock;

    const mockData = {
      file: {
        type: 'image/jpeg',
      },
      shouldAnalyse: true,
      imageId: 'ca57a08b-2b14-44df-a39b-2a175c5a6970',
    };

    beforeAll(() => {
      readAsDataURLMock = jest
        .spyOn(util, 'readAsDataURL')
        .mockResolvedValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA');
    });

    afterAll(() => {
      readAsDataURLMock.mockRestore();
    });

    afterEach(() => {
      readAsDataURLMock.mockClear();
    });

    it('should handle addImage', async (done) => {
      const { addImage } = addImageJson.data;
      const { image } = addImage;
      const { faces, labels, ...imageData } = image;

      // mock api response
      API.mockMutationResponseOnce({ addImage });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'IMAGES_ADD_REQUEST',
        payload: { addImage },
      });

      const store = mockstore();
      const { dispatch } = store;

      await reduxImages.addImage({
        file: mockData.file,
        shouldAnalyse: mockData.shouldAnalyse,
        imageId: mockData.imageId,
      })(dispatch);

      const expectedActions = [
        HOC_ACTIONS.START,
        __testables__.imagesAddNewImage(imageData),
        labelsAddLabelsDummyAction,
        facesAddFacesDummyAction,
        HOC_ACTIONS.SUCCESS,
      ];

      // check redux actions
      expect(store.getActions()).toEqual(expectedActions);

      const callArgs = API.mutation.mock.calls[0][1];

      // check generated file name
      expect(callArgs.type).toEqual(mockData.file.type);
      expect(callArgs.name).toEqual(`${mockData.imageId}.jpeg`);

      done();
    });

    it('should handle addImage for png files', async (done) => {
      const { addImage } = addImageJson.data;
      const { image } = addImage;
      const { faces, labels, ...imageData } = image;

      // mock api response
      API.mockMutationResponseOnce({ addImage });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'IMAGES_ADD_REQUEST',
        payload: { addImage },
      });

      const store = mockstore();
      const { dispatch } = store;

      const file = {
        ...mockData.file,
        type: 'image/png',
      };

      await reduxImages.addImage({
        file,
        shouldAnalyse: mockData.shouldAnalyse,
        imageId: mockData.imageId,
      })(dispatch);

      const expectedActions = [
        HOC_ACTIONS.START,
        __testables__.imagesAddNewImage(imageData),
        labelsAddLabelsDummyAction,
        facesAddFacesDummyAction,
        HOC_ACTIONS.SUCCESS,
      ];

      // check redux actions
      expect(store.getActions()).toEqual(expectedActions);

      const callArgs = API.mutation.mock.calls[0][1];

      // check generated file name
      expect(callArgs.type).toEqual(file.type);
      expect(callArgs.name).toEqual(`${mockData.imageId}.png`);

      done();
    });

    it('should handle addImage for invalid files', async (done) => {
      const { addImage } = addImageJson.data;

      // mock api response
      API.mockMutationResponseOnce({ addImage });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'IMAGES_ADD_REQUEST',
        payload: { addImage },
        error: new Error('Not a valid file type'),
        errorIsHandled: true,
      });

      const store = mockstore();
      const { dispatch } = store;

      const file = {
        ...mockData.file,
        type: 'nov a valid file type',
      };

      await reduxImages.addImage({
        file,
        shouldAnalyse: mockData.shouldAnalyse,
        imageId: mockData.imageId,
      })(dispatch);

      const expectedActions = [HOC_ACTIONS.START, HOC_ACTIONS.ERROR];

      // check redux actions
      expect(store.getActions()).toEqual(expectedActions);

      // should fail before API call
      expect(API.mutation).not.toHaveBeenCalled();

      done();
    });

    it('should handle addImage with default value for uuid', async (done) => {
      const { addImage } = addImageJson.data;

      // mock api response
      API.mockMutationResponseOnce({ addImage });

      const store = mockstore();
      const { dispatch } = store;

      await reduxImages.addImage({
        file: mockData.file,
        shouldAnalyse: mockData.shouldAnalyse,
      })(dispatch);

      // should fail before API call
      expect(API.mutation).toHaveBeenCalled();

      const callArgs = API.mutation.mock.calls[0][1];

      // newly generated id should exist
      const { id } = callArgs;
      expect(id).toBeTruthy();

      // check for image name
      expect(callArgs.name).toEqual(expect.stringContaining(id));

      done();
    });

    it('should handle addImage with default value for shouldAnalyse', async (done) => {
      const { addImage } = addImageJson.data;

      // mock api response
      API.mockMutationResponseOnce({ addImage });

      const store = mockstore();
      const { dispatch } = store;

      await reduxImages.addImage({
        file: mockData.file,
      })(dispatch);

      // should fail before API call
      expect(API.mutation).toHaveBeenCalled();

      const callArgs = API.mutation.mock.calls[0][1];

      // newly generated id should exist
      expect(callArgs.analyse).toBeTruthy();

      done();
    });
  });

  it('should handle listImages', async (done) => {
    const { listImage } = listImagesJson.data;

    // mock api response
    API.mockQueryResponseOnce({ listImage });

    // prepare expected actions
    const HOC_ACTIONS = testUtils.createHocActions({
      baseType: 'IMAGES_LIST_REQUEST',
      payload: { listImage },
    });

    const store = mockstore();
    const { dispatch } = store;

    await reduxImages.listImages()(dispatch);

    const expectedActions = [HOC_ACTIONS.START, __testables__.imagesAddImages(listImage.items), HOC_ACTIONS.SUCCESS];

    expect(store.getActions()).toEqual(expectedActions);

    done();
  });

  it('should handle getImage', async (done) => {
    const imageId = '2a2bdf23-e73f-4a2a-913e-da29926a195c';
    const { getImage } = getImageJson.data;
    const { faces, labels, ...image } = getImage;

    // mock api response
    API.mockQueryResponseOnce({ getImage });

    // prepare expected actions
    const HOC_ACTIONS = testUtils.createHocActions({
      baseType: 'IMAGES_GET_REQUEST',
      payload: { getImage },
    });

    const store = mockstore();
    const { dispatch } = store;

    await reduxImages.getImage(imageId)(dispatch);

    const expectedActions = [
      HOC_ACTIONS.START,
      __testables__.imagesAddImage(image),
      labelsAddLabelsDummyAction,
      facesAddFacesDummyAction,
      HOC_ACTIONS.SUCCESS,
    ];

    expect(store.getActions()).toEqual(expectedActions);

    done();
  });
});

describe('auth: reducer test suite', () => {
  const dummyTestAction = testUtils.dummyTestAction();

  const initialState = {
    ids: [],
    byId: {},
    addImageRequest: testUtils.createHocReducerState(),
    listImageRequest: testUtils.createHocReducerState(),
    getImageRequest: testUtils.createHocReducerState(),
  };

  it('should return initial store', () => {
    expect(reducer(undefined, dummyTestAction)).toEqual(initialState);
  });

  it('should handle IMAGES_ADD_NEW_IMAGE', () => {
    const image = getImageJson.data.getImage;
    expect(reducer(undefined, __testables__.imagesAddNewImage(image))).toEqual({
      ...initialState,
      ids: [image.id],
      byId: {
        [image.id]: image,
      },
    });
  });

  it('should handle IMAGES_ADD_IMAGE', () => {
    const image = getImageJson.data.getImage;
    expect(reducer(undefined, __testables__.imagesAddImage(image))).toEqual({
      ...initialState,
      ids: [image.id],
      byId: {
        [image.id]: image,
      },
    });
  });

  it('should handle IMAGES_ADD_IMAGES', () => {
    const images = listImagesJson.data.listImage.items;
    expect(reducer(undefined, __testables__.imagesAddImages(images))).toEqual({
      ...initialState,
      ids: images.map(image => image.id),
      byId: images.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.id]: cur,
        }),
        {},
      ),
    });
  });
});
