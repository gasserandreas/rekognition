/* global testUtils */
import * as selectors from '../selectors';

describe('user selector test suite', () => {
  const initialState = {
    user: {
      user: {
        email: 'test.user@test.com',
        firstname: 'Test',
        lastname: 'User',
      },
      userInfoRequest: testUtils.createHocReducerState(),
      updateUserRequest: testUtils.createHocReducerState(),
    },
  };

  it('should return empty object for null state', () => {
    expect(selectors.__testables__.userStateSelector({})).toEqual({});
  });

  it('should handle userStateSelector', () => {
    expect(selectors.__testables__.userStateSelector(initialState)).toEqual(initialState.user);
  });

  it('should handle userStateSelector', () => {
    expect(selectors.userSelector(initialState)).toEqual(initialState.user.user);
  });

  it('should handle getUserInfoRequestSelector', () => {
    expect(selectors.getUserInfoRequestSelector(initialState)).toEqual(initialState.user.userInfoRequest);
  });

  it('should handle updateUserRequestSelector', () => {
    expect(selectors.updateUserRequestSelector(initialState)).toEqual(initialState.user.updateUserRequest);
  });
});
