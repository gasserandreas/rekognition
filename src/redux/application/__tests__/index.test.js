/* global it testUtils */
import reducer, * as reduxApplication from '../index';

import * as sessionUtil from '../../../util/sessionUtil';
import * as reduxAuth from '../../auth';
import * as authSelectors from '../../auth/selectors';
import * as reduxImages from '../../images';
import messageReducer from '../message';

const { __testables__ } = reduxApplication;

describe('application simple action test suite', () => {
  it('should return appIdle action', () => {
    expect(reduxApplication.appIdle()).toEqual({
      type: reduxApplication.APP_IDLE,
    });
  });

  it('should return appReset action', () => {
    expect(reduxApplication.appReset()).toEqual({
      type: reduxApplication.APP_RESET,
    });
  });

  it('should return applicationWillLoad action', () => {
    expect(__testables__.applicationWillLoad()).toEqual({
      type: __testables__.APPLICATION_STATUS_SET,
      payload: reduxApplication.AppStatus.APPLICATION_WILL_LOAD,
    });
  });

  it('should return applicationDidLoad action', () => {
    expect(__testables__.applicationDidLoad()).toEqual({
      type: __testables__.APPLICATION_STATUS_SET,
      payload: reduxApplication.AppStatus.APPLICATION_DID_LOAD,
    });
  });
});

describe('application complex action test suite', () => {
  const mockstore = testUtils.createMockStore();

  const mockData = {
    state: {
      auth: {
        meta: {
          loggedIn: false,
        },
        userId: null,
        token: null,
      },
    },
    userId: '730dd215-a5f6-4b32-bb81-cf1e8ec89099',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzBkZDIxNS1hNWY2LTRiMzItYmI4MS1jZjFlOGVjODkwMzkiLCJjcmVhdGVkQXQiOjE1NTMyMDEwMjM5NzYsImlhdCI6MTU1MzIwMTAyM30.CI1ZSQodWkuGMAQJQRZ5F7bGFKJHTWj-ql0f_INVALID',
  };

  const jestDummyActionListImage = testUtils.dummyTestAction('LIST_IMAGES');
  const jestDummyActionRefreshToken = testUtils.dummyTestAction('REFRESH_TOKEN');

  let mockGetToken;
  let mockGetUserId;
  let spyOnTokenSelector;
  let spyOnAuthUserIdSelector;

  beforeAll(() => {
    jest.spyOn(reduxImages, 'listImages').mockImplementation(() => jestDummyActionListImage);

    jest.spyOn(reduxAuth, 'refreshToken').mockImplementation(() => jestDummyActionRefreshToken);

    spyOnTokenSelector = jest.spyOn(authSelectors, 'tokenSelector');
    spyOnAuthUserIdSelector = jest.spyOn(authSelectors, 'authUserIdSelector');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    /** need to be triggered before every test case
     * to allow modification on test case.
     */
    mockGetToken = jest.spyOn(sessionUtil, 'getToken').mockImplementation(() => null);

    mockGetUserId = jest.spyOn(sessionUtil, 'getUserId').mockImplementation(() => null);
  });

  afterEach(() => {
    mockGetToken.mockClear();
    mockGetUserId.mockClear();
    spyOnTokenSelector.mockClear();
    spyOnAuthUserIdSelector.mockClear();
  });

  it('should handle loadApplication without being authenticated', (done) => {
    const store = mockstore();
    const { dispatch } = store;

    reduxApplication.loadApplication()(dispatch, () => mockData.state);

    const expectedActions = [
      reduxApplication.__testables__.applicationWillLoad(),
      reduxApplication.__testables__.applicationDidLoad(),
    ];

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 250);
  });

  it('should handle loadApplication while being authenticated token / userId from session', (done) => {
    mockGetToken = jest.spyOn(sessionUtil, 'getToken').mockImplementation(() => mockData.token);

    mockGetUserId = jest.spyOn(sessionUtil, 'getUserId').mockImplementation(() => mockData.userId);

    const store = mockstore();
    const { dispatch } = store;

    reduxApplication.loadApplication()(dispatch, () => ({
      auth: {
        ...mockData.state.auth,
        meta: {
          ...mockData.state.auth.meta,
          loggedIn: true,
        },
      },
    }));

    const expectedActions = [
      reduxApplication.__testables__.applicationWillLoad(),
      jestDummyActionRefreshToken,
      jestDummyActionListImage,
      reduxApplication.__testables__.applicationDidLoad(),
    ];

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);

      // check token and userId getters
      expect(mockGetToken).toHaveBeenCalledTimes(1);
      expect(mockGetUserId).toHaveBeenCalledTimes(1);
      expect(spyOnTokenSelector).toHaveBeenCalledTimes(0);
      expect(spyOnAuthUserIdSelector).toHaveBeenCalledTimes(0);
      done();
    }, 250);
  });

  it('should handle loadApplication while being authenticated token / userId from session', (done) => {
    const store = mockstore();
    const { dispatch } = store;

    reduxApplication.loadApplication()(dispatch, () => ({
      auth: {
        meta: {
          ...mockData.state.auth.meta,
          loggedIn: true,
        },
        token: mockData.token,
        userId: mockData.userId,
      },
    }));

    const expectedActions = [
      reduxApplication.__testables__.applicationWillLoad(),
      jestDummyActionRefreshToken,
      jestDummyActionListImage,
      reduxApplication.__testables__.applicationDidLoad(),
    ];

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);

      // check token and userId getters
      expect(mockGetToken).toHaveBeenCalledTimes(1);
      expect(mockGetUserId).toHaveBeenCalledTimes(1);
      expect(spyOnTokenSelector).toHaveBeenCalledTimes(1);
      expect(spyOnAuthUserIdSelector).toHaveBeenCalledTimes(1);
      done();
    }, 250);
  });
});

describe('application reducer test suite', () => {
  const initialState = {
    status: reduxApplication.AppStatus.INITIAL,
    message: messageReducer(undefined, reduxApplication.appIdle()),
  };

  it('should create application redux state', () => {
    expect(reducer(undefined, reduxApplication.appIdle())).toEqual(initialState);
  });

  it('should handle APPLICATION_STATUS_SET', () => {
    expect(reducer(initialState, reduxApplication.__testables__.applicationWillLoad())).toEqual({
      ...initialState,
      status: reduxApplication.AppStatus.APPLICATION_WILL_LOAD,
    });
  });
});
