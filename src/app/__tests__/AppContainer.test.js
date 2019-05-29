import Container, { __testables__ } from '../AppContainer';
import { logOutUser } from '../../redux/auth';

const { mapStateToProps, mapDispatchToProps } = __testables__;

describe('AppContainer test suite', () => {
  it('check container function', () => {
    expect(Container).toBeInstanceOf(Function);
  });

  it('should return props from state', () => {
    const { message, ...attrs } = mapStateToProps({}, {});

    // check common keys
    expect(Object.keys(attrs)).toEqual([
      'isAuthenticated',
      'didLoad',
      'username',
    ]);

    // check message object
    expect(Object.keys(message)).toEqual([
      'show',
      'text',
      'title',
      'showRefresh',
    ]);
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      logOutUser,
    });
  });
});
