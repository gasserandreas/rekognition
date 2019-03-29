/* global testUtils */
import hocReducer, { hocCreateTypes, __testables__ } from '../HOC';
import * as reduxApplication from '../application';

describe('HOCH test suite', () => {
  const baseType = 'HOC_TEST';
  const ACTION_TYPE = {
    START: `${baseType}_START`,
    SUCCESS: `${baseType}_SUCCESS`,
    ERROR: `${baseType}_ERROR`,
  };

  let dateNowMock;

  beforeAll(() => {
    dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => 1553838359745);
  })

  afterAll(() => {
    dateNowMock.mockReset();
  })

  it('check hocCreateTypes', () => {
    expect(hocCreateTypes(baseType))
      .toEqual(ACTION_TYPE);
  });

  it('check checkHocTypes', () => {
    expect(__testables__.checkHocTypes({
      START: 'START',
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR'
    })).toEqual(true);
  });

  describe('HOC hocAsyncAction test suite', () => {
    it('should generate initial reducer state', () => {
      const reducer = hocReducer({
        ACTION_TYPE: ACTION_TYPE,
        noData: false,
      });
      expect(reducer(undefined, { type: reduxApplication.APP_IDLE }))
        .toEqual(testUtils.createHocReducerState());
    });

    it('should handle ACTION_TYPE.START', () => {
      const reducer = hocReducer({
        ACTION_TYPE: ACTION_TYPE,
        noData: false,
      });
      const expectedState = {
        ...testUtils.createHocReducerState(),
        loading: true,
      }
      expect(reducer(undefined, { type: ACTION_TYPE.START }))
        .toEqual(expectedState);
    });

    it('should handle ACTION_TYPE.SUCCESS', () => {
      const payload = {
        message: 'hello',
      };
      const reducer = hocReducer({
        ACTION_TYPE: ACTION_TYPE,
        noData: false,
      });
      const expectedState = {
        ...testUtils.createHocReducerState(),
        data: payload,
        lastFetch: Date.now(),
      };
      expect(reducer(undefined, { type: ACTION_TYPE.SUCCESS, payload, }))
        .toEqual(expectedState);
    });

    it('should handle ACTION_TYPE.SUCCESS with noData flag enabled', () => {
      const payload = {
        message: 'hello',
      };
      const reducer = hocReducer({
        ACTION_TYPE: ACTION_TYPE,
        noData: true,
      });
      const expectedState = {
        ...testUtils.createHocReducerState(),
        data: null,
        lastFetch: Date.now(),
        loading: false,
      };
      expect(reducer(undefined, { type: ACTION_TYPE.SUCCESS, payload, }))
        .toEqual(expectedState);
    });

    it('should handle ACTION_TYPE.ERROR', () => {
      const payload = new Error('uupppss something broke');
      const reducer = hocReducer({
        ACTION_TYPE: ACTION_TYPE,
        noData: false,
      });
      const expectedState = {
        ...testUtils.createHocReducerState(),
        error: payload,
        lastError: Date.now(),
        loading: false,
      };
      expect(reducer(undefined, { type: ACTION_TYPE.ERROR, payload, }))
        .toEqual(expectedState);
    });
  });

  describe('HOC hocAsyncAction test suite', () => {
    
  });
});
