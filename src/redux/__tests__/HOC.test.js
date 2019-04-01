/* global testUtils */
import hocReducer, { hocCreateTypes, __testables__, hocAsyncAction } from '../HOC';
import * as reduxApplication from '../application';
import { createNetworkError } from '../../util/ErrorHandler';

describe('HOCH test suite', () => {
  const baseType = 'HOC_TEST';
  const ACTION_TYPE = {
    START: `${baseType}_START`,
    SUCCESS: `${baseType}_SUCCESS`,
    ERROR: `${baseType}_ERROR`,
  };

  let dateNowMock;

  beforeAll(() => {
    const now = Date.now();
    dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => now);
  })

  afterAll(() => {
    dateNowMock.mockReset();
  })

  it('check hocCreateTypes', () => {
    expect(hocCreateTypes(baseType))
      .toEqual(ACTION_TYPE);
  });

  describe('HOC checkHocTypes test suite', () => {
    const hocType = {
      START: 'START',
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR'
    };

    it('check checkHocTypes default', () => {
      expect(__testables__.checkHocTypes(hocType)).toEqual(true);
    });

    it('check for unset / invalid START', () => {
      const { START, ...other } = hocType
      expect(__testables__.checkHocTypes({ ...other }))
        .toBeFalsy();
      
      expect(__testables__.checkHocTypes({
        ...hocType,
        START: 'invalid',
      }))
        .toBeFalsy();
    });

    it('check for unset / invalid SUCCESS', () => {
      const { SUCCESS, ...other } = hocType
      expect(__testables__.checkHocTypes({ ...other }))
        .toBeFalsy();
      
      expect(__testables__.checkHocTypes({
        ...hocType,
        SUCCESS: 'invalid',
      }))
        .toBeFalsy();
    });

    it('check for unset / invalid ERROR', () => {
      const { ERROR, ...other } = hocType
      expect(__testables__.checkHocTypes({ ...other }))
        .toBeFalsy();
      
      expect(__testables__.checkHocTypes({
        ...hocType,
        ERROR: 'invalid',
      }))
        .toBeFalsy();
    });
  });

  describe('HOC reducer test suite', () => {
    let consoleLogMock;
    
    beforeEach(() => {
      consoleLogMock = jest.spyOn(console, 'log')
        .mockImplementation(() => ({}));
    });

    afterEach(() => {
      consoleLogMock.mockRestore();
    });

    it('should reject on invalid HOC action types', async (done) => {
      const invalidActionTypes = {};

      try {
        hocReducer({
          ACTION_TYPE: invalidActionTypes,
          noData: false,
        });
        expect(true).toBeFalsy();
      } catch (error) {
        expect(consoleLogMock).toBeCalledTimes(1);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('No valid ACTION_TYPE specified');
        done();
      }
    });

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
    const API = {};
    const mockstore = testUtils.createMockStoreWithApi(API);

    let consoleLogMock;
    
    beforeEach(() => {
      consoleLogMock = jest.spyOn(console, 'log')
        .mockImplementation(() => ({}));
    });

    afterEach(() => {
      consoleLogMock.mockRestore();
    });

    it('should reject on invalid HOC action types', async (done) => {
      const invalidActionTypes = {};

      try {
        hocAsyncAction(
          invalidActionTypes,
          () => () => {
            return Promise.resolve();
          }
        );
        expect(true).toBeFalsy();
      } catch(error) {
        expect(consoleLogMock).toBeCalledTimes(1);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('No valid ACTION_TYPE specified');
        done();
      }
    });

    it('should handle ACTION_TYPE.SUCCESS', async (done) => {
      const store = mockstore();

      const payload = {
        message: 'hello',
      };

      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: baseType,
        payload,
      });

      const expectedActions = [
        HOC_ACTIONS.START,
        HOC_ACTIONS.SUCCESS,
      ];

      const actionAttr = {
        value: null,
      };

      const hocAction = hocAsyncAction(
        ACTION_TYPE,
        (input) => (dispatch, getState, createThunk) => {
          // check input vars
          expect(input).toEqual(actionAttr);

          expect(dispatch).toBeInstanceOf(Function);
          expect(getState).toBeInstanceOf(Function);
          expect(createThunk).toBeInstanceOf(Object);

          return Promise.resolve(payload);
        }
      );

      await hocAction(actionAttr)(store.dispatch);

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should handle ACTION_TYPE.ERROR', async (done) => {
      const store = mockstore();

      const error = new Error('custom error');
      const payload = createNetworkError(error);

      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: baseType,
        payload,
        error,
        errorIsHandled: true,
      });

      const expectedActions = [
        HOC_ACTIONS.START,
        HOC_ACTIONS.ERROR,
      ];

      const actionAttr = {
        value: null,
      };

      const hocAction = hocAsyncAction(
        ACTION_TYPE,
        (input) => (dispatch, getState, createThunk) => {
          // check input vars
          expect(input).toEqual(actionAttr);

          expect(dispatch).toBeInstanceOf(Function);
          expect(getState).toBeInstanceOf(Function);
          expect(createThunk).toBeInstanceOf(Object);

          return Promise.reject(error);
        }
      );

      await hocAction(actionAttr)(store.dispatch);

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should handle ACTION_TYPE.ERROR with rejectable', async (done) => {
      const store = mockstore();

      const error = new Error('custom error');
      const payload = createNetworkError(error);

      const HOC_ACTIONS = testUtils.createHocActions({
        baseType: baseType,
        payload,
        error,
        errorIsHandled: true,
      });

      const expectedActions = [
        HOC_ACTIONS.START,
        HOC_ACTIONS.ERROR,
      ];

      const actionAttr = {
        value: null,
      };

      const hocAction = hocAsyncAction(
        ACTION_TYPE,
        (input) => (dispatch, getState, createThunk) => {
          // check input vars
          expect(input).toEqual(actionAttr);

          expect(dispatch).toBeInstanceOf(Function);
          expect(getState).toBeInstanceOf(Function);
          expect(createThunk).toBeInstanceOf(Object);

          return Promise.reject(error);
        },
        {
          rejectable: true,
        }
      );

      try {
        await hocAction(actionAttr)(store.dispatch);

        // FAIL here as not happy test path
        expect(true).toBeFalsy();
      } catch (actionError) {
        expect(store.getActions()).toEqual(expectedActions);
        expect(actionError).toEqual(error);
        done();
      }
    });
  });
});
