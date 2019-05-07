import { __testables__ } from '../Container';
import { logInUser } from '../../../redux/auth';

const { select, mapDispatchToProps } = __testables__;

describe('auth login container test suite', () => {
  it('should return container state', () => {
    const state = select({});

    expect(state).toEqual({
      isAuthenticated: false,
      loginRequest: undefined,
    });

    expect(Object.keys(state)).toEqual(['isAuthenticated', 'loginRequest']);
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      logInUser,
    });
  });
});
