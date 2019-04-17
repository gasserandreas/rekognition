import { __testables__ } from '../Container';
import { logInUser } from '../../../redux/auth';

const { select, mapDispatchToProps } = __testables__;

describe('auth container test suite', () => {
  it('should return container state', () => {
    expect(select({})).toEqual({
      isAuthenticated: false,
      loginRequest: undefined,
    });
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      logInUser,
    });
  });
});
