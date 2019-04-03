import rootReducer from '../rootReducer';

import {
  appIdle,
  appReset,
  __testables__ as applicationTestables,
} from '../application';
import {
   __testables__ as authTestables
} from '../auth';

const { applicationDidLoad } = applicationTestables;
const { authSetToken } = authTestables;

describe('root reducer test suite', () => {
  let mockedDateNow;

  beforeAll(() => {
    const now = Date.now();
    mockedDateNow = jest.spyOn(Date, 'now').mockImplementation(() => now);
  });

  afterAll(() => {
    mockedDateNow.restoreMock();
  });

  const firstLevelKeys = [
    'appTime',
    'application',
    'auth',
    'images',
    'labels',
    'faces',
    'user',
  ];

  it('should return root redux tree', () => {
    const rootState = rootReducer(undefined, appIdle());
    expect(Object.keys(rootState)).toEqual(firstLevelKeys);
  });

  it('should reset reducer data on APP_RESET', () => {
    // fire some actions to reducer
    const rootState1 = rootReducer(undefined, appIdle());
    const rootState2 = rootReducer(rootState1, applicationDidLoad());
    const rootState3 = rootReducer(rootState2, authSetToken('invalid token'));

    // check for non empty redux state
    expect(rootState3).not.toEqual(rootReducer(undefined, appIdle));

    // fire reset and check again
    expect(rootReducer(rootState3, appReset()))
      .toEqual(rootState1);
  });
});
