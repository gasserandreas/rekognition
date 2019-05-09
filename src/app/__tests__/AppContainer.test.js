import Container, { __testables__ } from '../AppContainer';
import { logOutUser } from '../../redux/auth';
import { loadApplication } from '../../redux/application';

const { mapStateToProps, mapDispatchToProps } = __testables__;

describe('AppContainer test suite', () => {
  it('check container function', () => {
    expect(Container).toBeInstanceOf(Function);
  });

  it('should return props from state', () => {
    expect(mapStateToProps({}, {})).toEqual({
      isAuthenticated: false,
      username: undefined,
      message: {
        show: undefined,
        text: undefined,
        title: undefined,
        showRefresh: undefined,
      },
    });
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      loadApplication,
      logOutUser,
    });
  });
});
