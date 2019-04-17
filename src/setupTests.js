import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jestFetchMock from "jest-fetch-mock";

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createNetworkError } from './util/ErrorHandler';
import { hocCreateTypes } from './redux/HOC';

// setup enzyme
configure({ adapter: new Adapter() });

// setup fetch-mock
global.fetch = jestFetchMock;

// basic helpers
const createMockStore = (middleware = [
  // add your redux middleware here
  thunk,
]) => configureMockStore(middleware);

const createMockStoreWithApi = (api) => {
  const middleware = [
    thunk.withExtraArgument({
      GraphApi: api,
    }),
  ];
  return createMockStore(middleware);
}

const createHocActions = (attr = {
  baseType: '',
  payload: null,
  error: null,
  errorIsHandled: false,
}) => {
  const ACTION_TYPES = hocCreateTypes(attr.baseType);
  return {
    START: { type: ACTION_TYPES.START },
    SUCCESS: {
      type: ACTION_TYPES.SUCCESS,
      payload: attr.payload,
    },
    ERROR: {
      type: ACTION_TYPES.ERROR,
      payload: createNetworkError(attr.error),
      error: attr.errorIsHandled,
    }
  }
};

const createHocReducerState = (state) => ({
  data: null,
  lastError: null,
  error: null,
  lastFetch: null,
  loading: false,
  ...state,
});

const dummyTestAction = (type = 'EMPTY') => ({
  type: `JEST_ACTION_${type}`,
});

// create and export testUtils
global.testUtils = {
  createMockStore,
  createMockStoreWithApi,
  createHocActions,
  createHocReducerState,
  dummyTestAction,
};