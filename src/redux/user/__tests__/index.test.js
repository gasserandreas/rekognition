/* global it testUtils */
import GraphApi from '../../../util/GraphApi';

import reducer, * as reduxUser from '../index';

import * as selectorsAuth from '../../auth/selectors';

jest.mock('../../../util/GraphApi');

const { __testables__ } = reduxUser;

const mockedData = {
  user: {
    email: 'test.user@test.com',
    firstname: 'Test',
    lastname: 'User',
  },
  userId: 'ca57a08b-2b14-44df-a39b-2a175c5a6294',
};

describe('user: simple action test suite', () => {
  it('should create userSetUser action', () => {
    const { user } = mockedData;
    expect(__testables__.userSetUser(user))
      .toEqual({
        type: __testables__.USER_SET_USER,
        payload: user,
      });
  });
});

describe('user: complex action test suite', () => {
  const API = new GraphApi();
  const mockstore = testUtils.createMockStoreWithApi(API);

  let dateNowMock;
  let authUserIdSelectorMock;

  beforeAll(() => {
    dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => 1553237036202);
    authUserIdSelectorMock = jest.spyOn(selectorsAuth, 'authUserIdSelector')
      .mockImplementation(() => mockedData.userId);
  });

  afterEach(() => {
    API.resetMocks();
  });

  afterAll(() => {
    dateNowMock.mockClear();
    authUserIdSelectorMock.mockClear();
  });

  it('should handle updateUser', async (done) => {
    const { user } = mockedData;

    // mock api response
    API.mockMutationResponseOnce({ updateUser: { user } });

    // prepare expected actions
    const HOC_ACTIONS = testUtils.createHocActions({
      baseType: 'USER_UPDATE_USER_REQUEST',
      payload: { updateUser: { user } },
    });

    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [
      HOC_ACTIONS.START,
      __testables__.userSetUser(user),
      HOC_ACTIONS.SUCCESS,
    ];

    await reduxUser.updateUser(user)(dispatch);

    expect(store.getActions()).toEqual(expectedActions);

    done();
  });

  it('should handle getUserInfo', async (done) => {
    const { user } = mockedData;

    // mock api response
    API.mockQueryResponseOnce({ getUserInfo: user });

    // prepare expected actions
    const HOC_ACTIONS = testUtils.createHocActions({
      baseType: 'USER_GET_USER_INFO_REQUEST',
      payload: { getUserInfo: user },
    });

    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [
      HOC_ACTIONS.START,
      __testables__.userSetUser(user),
      HOC_ACTIONS.SUCCESS,
    ];

    await reduxUser.getUserInfo()(dispatch, {});

    expect(API.query.mock.calls[0][1])
      .toEqual({ userId: mockedData.userId });

    expect(store.getActions()).toEqual(expectedActions);

    done();
  });
});

describe('user: reducer test suite', () => {
  const initialUser = {
    firstname: '',
    lastname: '',
    email: '',
  };

  const initialState = {
    user: initialUser,
    userInfoRequest: testUtils.createHocReducerState(),
    updateUserRequest: testUtils.createHocReducerState(),
  };

  const dummyTestAction = testUtils.dummyTestAction();

  it('should create initial store state', () => {
    expect(reducer(undefined, dummyTestAction))
      .toEqual(initialState);
  });

  it('should handle USER_SET_USER', () => {
    const { user } = mockedData;
    expect(reducer(undefined, __testables__.userSetUser(user)))
      .toEqual({
        ...initialState,
        user,
      });
  });
});
