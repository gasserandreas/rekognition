import React from 'react';
import { mount } from 'enzyme';

import * as authHooks from '../auth';

describe('auth hooks test suite', () => {
  const path = 'my/custom/path';
  const initialProps = {
    isAuthenticated: true,
    history: {
      push: jest.fn(),
    },
  };
  const clearTimeoutSpyOn = jest.spyOn(window, 'clearTimeout');

  beforeEach(() => {
    initialProps.history.push.mockClear();
    clearTimeoutSpyOn.mockClear();
  });

  const hook = authHooks.createUseIsAuthenticatedHistoryPush(path);
  const HookTester = ({ isAuthenticated, history }) => {
    hook(isAuthenticated, history);

    return <div>empty div</div>;
  };

  it('should call history push if authenticated ', (done) => {
    // should not be called
    expect(initialProps.history.push).not.toHaveBeenCalled();

    // mount HookTester
    const wrapper = mount(<HookTester {...initialProps} />);
    expect(wrapper.exists()).toBeTruthy();

    // should be called now
    setTimeout(() => {
      expect(initialProps.history.push).toHaveBeenCalled();
      done();
    }, 500);
  });

  it('should not call history push if not authenticated ', (done) => {
    // should not be called
    expect(initialProps.history.push).not.toHaveBeenCalled();

    const newPops = {
      ...initialProps,
      isAuthenticated: false,
    };

    // mount HookTester
    const wrapper = mount(<HookTester {...newPops} />);
    expect(wrapper.exists()).toBeTruthy();

    // should be called now
    setTimeout(() => {
      expect(initialProps.history.push).not.toHaveBeenCalled();
      done();
    }, 500);
  });

  it('should clearTimeout after hook', () => {
    // not able to test right now, waiting for hook support in enzyme
    // link: https://github.com/airbnb/enzyme/issues/2011
    console.log('createUseIsAuthenticatedHistoryPush return value not tesable due missing hook support in enzyme');
  });
});
