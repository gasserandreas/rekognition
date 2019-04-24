import { __testables__ } from '../Container';
import { logOutUser } from '../../redux/auth';
import { getUserInfo, updateUser } from '../../redux/user';

const { select, mapDispatchToProps } = __testables__;

describe('auth register container test suite', () => {
  it('should return container state', () => {
    const state = select({});
    expect(state).toEqual({
      user: undefined,
      getUserInfoRequest: undefined,
      updateUserRequest: undefined,
      authMeta: {},
    });

    expect(Object.keys(state)).toEqual([
      'user',
      'getUserInfoRequest',
      'updateUserRequest',
      'authMeta',
    ]);
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      logOutUser,
      getUserInfo,
      updateUser,
    });
  });
});
