/* global it testUtils */
import * as sessionUtil from '../../../util/sessionUtil';
import GraphApi from '../../../util/GraphApi';

import reducer, * as reduxAuth from '../index';
import * as reduxApplication from '../../application';

jest.mock('../../../util/GraphApi');

const { __testables__ } = reduxAuth;

const mockedData = {
  username: 'Test',
  firstname: 'Test',
  lastname: 'User',
  id: '730dd215-a5f6-4b32-bb81-cf1e8ec89099',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzBkZDIxNS1hNWY2LTRiMzItYmI4MS1jZjFlOGVjODkwMzkiLCJjcmVhdGVkQXQiOjE1NTMyMDEwMjM5NzYsImlhdCI6MTU1MzIwMTAyM30.CI1ZSQodWkuGMAQJQRZ5F7bGFKJHTWj-ql0f_INVALID',
  remember: true,
};

// simple action tests
describe('auth: simple action test suite', () => {
  it('should return authLogin object', () => {
    const { remember, username } = mockedData;

    const { type, payload } = __testables__.authLogin(remember, username);
    const { loggedInSince, ...payloadData } = payload;

    expect(type).toEqual(reduxAuth.AUTH_LOG_IN);
    expect(payloadData).toEqual({
      loggedIn: true,
      remember,
      username,
    });
    
    // check loggedInSince timer
    expect(Date.now() - loggedInSince < 10).toBeTruthy();
  });

  it('should return authLogOut object', () => {
    const message = 'message';
    expect(__testables__.authLogOut(message))
      .toEqual({
        type: reduxAuth.AUTH_LOG_OUT,
        payload: message,
      });
  });

  it('should return authSetToken object', () => {
    expect(__testables__.authSetToken(mockedData.token))
      .toEqual({
        type: reduxAuth.AUTH_SET_TOKEN,
        payload: mockedData.token,
      });
  });

  it('should return authSetUserId object', () => {
    expect(__testables__.authSetUserId(mockedData.id))
      .toEqual({
        type: reduxAuth.AUTH_SET_USER_ID,
        payload: mockedData.id,
      });
  });

  it('should return authSetValidEmail object', () => {
    expect(__testables__.authSetValidEmail())
      .toEqual({
        type: reduxAuth.AUTH_SET_VALID_EMAIL,
      });
  });

  it('should return authSetInvalidEmail object', () => {
    expect(__testables__.authSetInvalidEmail())
      .toEqual({
        type: reduxAuth.AUTH_SET_INVALID_EMAIL,
      });
  });

  it('should return authResetValidEmail object', () => {
    expect(__testables__.authResetValidEmail())
      .toEqual({
        type: reduxAuth.AUTH_RESET_VALID_EMAIL,
      });
  });
});

describe('auth: complex action test suite', () => {
  const API = new GraphApi();
  const mockstore = testUtils.createMockStoreWithApi(API);
  
  describe('auth: complex action - handleAuth test suite', () => {
    let dateMock;
    let setTokenMock = jest.fn(() => true);
    let setUserIdMock = jest.fn(() => true);;

    let consoleLogMock;
    
    beforeAll(() => {
      dateMock = jest.spyOn(Date, 'now').mockImplementation(() => 1553237036202);
      consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => ({}));
    });

    afterAll(() => {
      dateMock.mockClear();
      consoleLogMock.mockClear();
    });

    beforeEach(() => {
      // session util mocks
      setTokenMock = jest.spyOn(sessionUtil, 'setToken');
      setUserIdMock = jest.spyOn(sessionUtil, 'setUserId');
    });

    afterEach(() => {
      setTokenMock.mockClear();
      setUserIdMock.mockClear();
    });

    it('should handle handleAuth without remember', async (done) => {
      const { id, firstname, token } = mockedData;
      const remember = false;

      const store = mockstore();
      const { dispatch } = store;

      const expectedActions = [
        __testables__.authSetUserId(id),
        __testables__.authLogin(remember, firstname),
      ];

      await __testables__.handleAuth(token, { id, firstname }, remember)(dispatch);
      expect(store.getActions()).toEqual(expectedActions);

      expect(setTokenMock).toHaveBeenCalledWith(token);
      expect(setUserIdMock).toHaveBeenCalledWith(id);

      done();
    });

    it('should handle handleAuth with remember', async (done) => {
      const { id, firstname, token } = mockedData;
      const remember = true;

      const store = mockstore();
      const { dispatch } = store;

      const expectedActions = [
        __testables__.authSetToken(token),
        __testables__.authSetUserId(id),
        __testables__.authLogin(remember, firstname),
      ];

      await __testables__.handleAuth(token, { id, firstname }, remember)(dispatch);
      expect(store.getActions()).toEqual(expectedActions);

      expect(setTokenMock).toHaveBeenCalledWith(token);
      expect(setUserIdMock).toHaveBeenCalledWith(id);

      done();
    });

    it('should handle logOutUser', async (done) => {
      const message = 'logout';
      const broadcast = true;
  
      const store = mockstore();
      const { dispatch } = store;
  
      const expectedActions = [
        __testables__.authLogOut(message),
      ];

      // set localStorage and sessionStorage
      const testValue = 'test';
      window.localStorage.setItem('test', testValue);
      window.sessionStorage.setItem('test', testValue);

      // check before dispatch
      expect(window.localStorage.test).toEqual(testValue);
      expect(window.sessionStorage.test).toEqual(testValue);
      expect(window.localStorage.logout).toBeFalsy();

      await reduxAuth.logOutUser(message, broadcast)(dispatch);

      // check after dispatch
      expect(window.localStorage.test).toEqual(undefined);
      expect(window.sessionStorage.test).toEqual(undefined);
      expect(window.localStorage.logout).toBeTruthy();
      
      expect(setTokenMock).toHaveBeenCalledWith(null);
      expect(consoleLogMock).toHaveBeenCalled();

      expect(store.getActions()).toEqual(expectedActions);
  
      done();
    });
  });

  it('should handle invalidateEmail', () => {
    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [
      __testables__.authResetValidEmail(),
    ];

    reduxAuth.invalidateEmail()(dispatch);


    expect(store.getActions()).toEqual(expectedActions);
  });

  describe('auth: complex action - hocAsyncAction based complex actions test suite', () => {
    let loadApplicationAuthenticatedMock;
    
    beforeAll(() => {
      // mock external actions to test independently
      loadApplicationAuthenticatedMock = jest
        .spyOn(reduxApplication, 'loadApplicationAuthenticated')
        .mockImplementation(() => ({
          type: reduxApplication.APP_IDLE,
        }));
    });

    afterAll(() => {
      loadApplicationAuthenticatedMock.mockRestore();
    })

    afterEach(() => {
      API.resetMocks();
    });

    it('should handle logInUser', async (done) => {
      // create data objects
      const remember = false;
      const { id, firstname, lastname, token } = mockedData;
      const user = {
        id,
        firstname,
        lastname,
      };
      const loginUser = {
        user,
        token,
      };

      // mock api response
      API.mockMutationResponseOnce({ loginUser });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'AUTH_LOGIN_REQUEST',
        payload: { loginUser },
      });
    
      const store = mockstore();
      const { dispatch } = store;

      const expectedActions = [
        HOC_ACTIONS.START,
        __testables__.authSetUserId(id),
        __testables__.authLogin(remember, firstname),
        reduxApplication.appIdle(),
        HOC_ACTIONS.SUCCESS,
      ];

      await reduxAuth
        .logInUser({ email: '', password: '', remember })(dispatch);

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('should handle signupUser', async (done) => {
      // create data objects
      const remember = false;
      const { id, firstname, lastname, token } = mockedData;
      const user = {
        id,
        firstname,
        lastname,
      };
      const signUpUser = {
        user,
        token,
      };

      // mock api response
      API.mockMutationResponseOnce({ signUpUser });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'AUTH_SIGNUP_REQUEST',
        payload: { signUpUser },
      });
    
      const store = mockstore();
      const { dispatch } = store;

      const expectedActions = [
        HOC_ACTIONS.START,
        __testables__.authSetUserId(id),
        __testables__.authLogin(remember, firstname),
        reduxApplication.appIdle(),
        HOC_ACTIONS.SUCCESS,
      ];

      await reduxAuth
        .signupUser({ email: '', password: '', remember, firstname, lastname })(dispatch);

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('should handle checkEmail for registered email', async (done) => {
      const { email } = mockedData;

      // mock api response
      API.mockQueryResponseOnce({ emailInUse: true });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'AUTH_CHECK_EMAIL_REQUEST',
        payload: {
          emailInUse: true,
        },
      });
    
      const store = mockstore();
      const { dispatch } = store;

      const expectedActions = [
        HOC_ACTIONS.START,
        __testables__.authSetInvalidEmail(),
        HOC_ACTIONS.SUCCESS,
      ];

      await reduxAuth.checkEmail(email)(dispatch);

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('should handle checkEmail for new email', async (done) => {
      const { email } = mockedData;

      // mock api response
      API.mockQueryResponseOnce({ emailInUse: false });

      // prepare expected actions
      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: 'AUTH_CHECK_EMAIL_REQUEST',
        payload: {
          emailInUse: false,
        },
      });
    
      const store = mockstore();
      const { dispatch } = store;

      const expectedActions = [
        HOC_ACTIONS.START,
        __testables__.authSetValidEmail(),
        HOC_ACTIONS.SUCCESS,
      ];

      await reduxAuth.checkEmail(email)(dispatch);

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('should handle refreshToken', async (done) => {
      const { id, firstname, lastname, token } = mockedData;
      const username = firstname;
      const remember = true;

      const user = {
        id,
        firstname,
        lastname,
      };

      const refreshToken = {
        user,
        token,
      };

      // mock api response
      API.mockMutationResponseOnce({ refreshToken });

      const store = mockstore(() => ({
        auth: {
          meta: {
            remember,
          },
          username,
        }
      }));
      const { dispatch } = store;

      const expectedActions = [
        __testables__.authSetToken(token),
        __testables__.authSetUserId(id),
        __testables__.authLogin(remember, username),
      ];

      await dispatch(reduxAuth.refreshToken(token, id));

      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

  });

});