/* global testUtils */
import * as selectors from '../selectors';

const initialState = {
  auth: {
    userId: null,
    username: '',
    token: null,
    meta: {},
    validEmail: null,
    loginRequest: testUtils.createHocReducerState(),
    signupRequest: testUtils.createHocReducerState(),
    checkEmailRequest: testUtils.createHocReducerState(),
  },
};

const state = {
  auth: {
    ...initialState.auth,
    userId: '730dd215-a5f6-4b32-bb81-cf1e8ec89099',
    username: 'Test user',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzBkZDIxNS1hNWY2LTRiMzItYmI4MS1jZjFlOGVjODkwMzkiLCJjcmVhdGVkQXQiOjE1NTMyMDEwMjM5NzYsImlhdCI6MTU1MzIwMTAyM30.CI1ZSQodWkuGMAQJQRZ5F7bGFKJHTWj-ql0f_INVALID',
    meta: {
      loggedIn: true,
      loggedInSince: Date.now(),
      remember: true,
    },
    validEmail: true,
  },
};

describe('auth selector test suite', () => {
  it('isAuthenticatedSelector value', () => {
    // value
    expect(selectors.isAuthenticatedSelector(state))
      .toEqual(state.auth.meta.loggedIn);

    // default value
    expect(selectors.isAuthenticatedSelector(initialState))
      .toEqual(false);
  });

  it('authUserIdSelector value', () => {
    // value
    expect(selectors.authUserIdSelector(state))
      .toEqual(state.auth.userId);

    // default value
    expect(selectors.authUserIdSelector(initialState))
      .toEqual(null);
  });

  it('tokenSelector value', () => {
    // value
    expect(selectors.tokenSelector(state))
      .toEqual(state.auth.token);

    // default value
    expect(selectors.tokenSelector(initialState))
      .toEqual(null);
  });

  it('authMetaSelector value', () => {
    // value
    expect(selectors.authMetaSelector(state))
      .toEqual(state.auth.meta);
  });

  it('authRememberSelector value', () => {
    // value
    expect(selectors.authRememberSelector(state))
      .toEqual(state.auth.meta.remember);

    // default value
    expect(selectors.authRememberSelector(initialState))
      .toEqual(false);
  });

  it('authUsernameSelector value', () => {
    // value
    expect(selectors.authUsernameSelector(state))
      .toEqual(state.auth.username);
  });

  it('isValidEmailSelector value', () => {
    // value
    expect(selectors.isValidEmailSelector(state))
      .toEqual(state.auth.validEmail);
  });

  it('loginRequestSelector value', () => {
    // value
    expect(selectors.loginRequestSelector(state))
      .toEqual(state.auth.loginRequest);
  });

  it('signUpRequestSelector value', () => {
    // value
    expect(selectors.signUpRequestSelector(state))
      .toEqual(state.auth.signupRequest);
  });

  it('checkEmailRequestSelector value', () => {
    // value
    expect(selectors.checkEmailRequestSelector(state))
      .toEqual(state.auth.checkEmailRequest);
  });
});
