/* global it testUtils */

import reducer, * as reduxAuth from '../index';
const { __testables__ } = reduxAuth;

const mockedData = {
  username: 'Test',
  id: '730dd215-a5f6-4b32-bb81-cf1e8ec89099',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzBkZDIxNS1hNWY2LTRiMzItYmI4MS1jZjFlOGVjODkwMzkiLCJjcmVhdGVkQXQiOjE1NTMyMDEwMjM5NzYsImlhdCI6MTU1MzIwMTAyM30.CI1ZSQodWkuGMAQJQRZ5F7bGFKJHTWj-ql0f_jKhtV0',
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
  const { createMockStore } = testUtils;
  const mockstore = createMockStore();
  
  it('should handle handleAuth without remember', async (done) => {
    const { id, firstname, token } = mockedData;
    const remember = false;

    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [
      __testables__.authSetUserId(id),
      __testables__.authLogin(remember, firstname),
    ];

    try {
      await __testables__.handleAuth(token, { id, firstname }, remember)(dispatch);
      expect(store.getActions()).toEqual(expectedActions);
      done();
    } catch (error) {
      console.log(error);
    }
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

    try {
      await __testables__.handleAuth(token, { id, firstname }, remember)(dispatch);
      expect(store.getActions()).toEqual(expectedActions);
      done();
    } catch (error) {
      console.log(error);
    }
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
});
