/* global testUtils */
import * as selectors from '../selectors';

import * as reduxApplication from '../index'
import messageReducer from '../message';

const initialState = {
  application: {
    status: reduxApplication.AppStatus.INITIAL,
    message: messageReducer(undefined, { type: reduxApplication.appIdle() }),
  },
};

describe('application selector test suite', () => {
  it('should return applicationState value', () => {
    expect(selectors.applicationStateSelector(initialState))
      .toEqual(initialState.application);
  })

  it('should return applicationStatus value', () => {
    expect(selectors.applicationStatusSelector(initialState))
      .toEqual(initialState.application.status);
  });
});
