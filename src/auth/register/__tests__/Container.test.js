import { __testables__ } from '../Container';
import { signupUser, checkEmail, invalidateEmail } from '../../../redux/auth';

const { select, mapDispatchToProps } = __testables__;

describe('auth register container test suite', () => {
  it('should return container state', () => {
    const state = select({});
    expect(state).toEqual({
      isAuthenticated: false,
      signupRequest: undefined,
      checkEmailRequest: undefined,
      validEmail: undefined,
    });

    expect(Object.keys(state)).toEqual(['isAuthenticated', 'signupRequest', 'validEmail', 'checkEmailRequest']);
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      signupUser,
      checkEmail,
      invalidateEmail,
    });
  });
});
