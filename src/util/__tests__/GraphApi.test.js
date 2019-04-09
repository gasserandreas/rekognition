/* global testUtils */
import { ApolloClient } from 'apollo-client';
import * as apolloLinkContext from 'apollo-link-context';

import GraphApi, { __testables__ } from '../GraphApi';

import { createNetworkError } from '../ErrorHandler';
import * as sessionUtil from '../sessionUtil';

describe('GraphApi test suite', () => {
  const mockedData = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzBkZDIxNS1hNWY2LTRiMzItYmI4MS1jZjFlOGVjODkwMzkiLCJjcmVhdGVkQXQiOjE1NTMyMDEwMjM5NzYsImlhdCI6MTU1MzIwMTAyM30.CI1ZSQodWkuGMAQJQRZ5F7bGFKJHTWj-ql0f_INVALID',
    endpoint: 'https://graph/api/endpoint',
  };

  let getTokenMock;
  let onAuthErrorMock;
  let setContextMock;
  let resetStoreMock;
  let graphApiQueryMock;
  let graphApiMutationMock;

  beforeAll(() => {
    getTokenMock = jest.spyOn(sessionUtil, 'getToken')
      .mockImplementation(() => mockedData.token);
    onAuthErrorMock = jest.fn();
    setContextMock = jest.spyOn(apolloLinkContext, 'setContext');
  });

  afterEach(() => {
    getTokenMock.mockClear();
    onAuthErrorMock.mockClear();
    setContextMock.mockClear();
    resetStoreMock && resetStoreMock.mockClear();
    graphApiQueryMock && graphApiQueryMock.mockClear();
    graphApiMutationMock && graphApiMutationMock.mockClear();
  });

  afterAll(() => {
    getTokenMock.mockRestore();
    onAuthErrorMock.mockRestore();
    setContextMock.mockRestore();
    resetStoreMock && resetStoreMock.mockRestore();
    graphApiQueryMock && graphApiQueryMock.mockRestore();
    graphApiMutationMock && graphApiMutationMock.mockRestore();
  });

  it('should initialize GraphApi class', () => {
    const API = new GraphApi({
      endpoint: mockedData.endpoint,
      onAuthError: onAuthErrorMock,
    });
    expect(API).toBeTruthy();
    expect(API).toBeInstanceOf(GraphApi);

    // check for Apollo client
    expect(API.client).toBeInstanceOf(ApolloClient);
  });

  it('should use provided endpoint as API endpoint', () => {
    const API = new GraphApi({
      endpoint: mockedData.endpoint,
      onAuthError: onAuthErrorMock,
    });
    expect(API.endpoint).toEqual(mockedData.endpoint);
  });

  it('should add Bearer token to every request call', () => {
    new GraphApi({
      endpoint: mockedData.endpoint,
      onAuthError: onAuthErrorMock,
    });

    // check if getAuthToken was called
    expect(setContextMock).toBeCalled();
    expect(setContextMock).toBeCalledWith(__testables__.getAuthToken);
    
    // check for proper getAuthToken execution
    const initialHeader = {
      headers: {
        arg: 'arg',
      },
    };

    // check with enabled token
    const expectedHeaderWithToken = {
      headers: {
        ...initialHeader.headers,
        authorization: `Bearer ${sessionUtil.getToken()}`,
      },
    };
    expect(__testables__.getAuthToken(null, initialHeader))
      .toEqual(expectedHeaderWithToken);
    
      // check for without token
    getTokenMock = getTokenMock.mockImplementation(() => null);

    const expectedHeaderWithoutToken = {
      headers: {
        ...initialHeader.headers,
        authorization: '',
      },
    };

    expect(__testables__.getAuthToken(null, initialHeader))
      .toEqual(expectedHeaderWithoutToken);
  });

  it('should allow reset the API', () => {
    const API = new GraphApi({
      endpoint: mockedData.endpoint,
      onAuthError: onAuthErrorMock,
    });

    // add mock
    resetStoreMock = jest.spyOn(API.client, 'resetStore')
      .mockImplementation(() => true);

    API.reset();

    expect(resetStoreMock).toHaveBeenCalledTimes(1);

    // remove link and try again to reset
    API.client = null;
    API.reset();

    expect(resetStoreMock).toHaveBeenCalledTimes(1);
  });

  it('should handle network errors', async (done) => {
    const API = new GraphApi({
      endpoint: mockedData.endpoint,
      onAuthError: onAuthErrorMock,
    });
    
    const error = new Error('network error');

    try {
      await API.handleNetworkError(error);
    } catch (retreivedError) {
      expect(retreivedError).toEqual(createNetworkError(error));
    }

    done();
  });

  it('should handle general graph errors', () => {
    const API = new GraphApi({
      endpoint: mockedData.endpoint,
      onAuthError: onAuthErrorMock,
    });

    const errorOptions = {
      extensions: {
        code: '',
      },
      message: 'error message',
      path: '/base/path',
    }

    // basic error handling
    const error = API.handleGraphError(errorOptions);

    expect(error).toEqual({
      code: errorOptions.extensions.code,
      message: errorOptions.message,
      path: errorOptions.path,
    });

    // error with code extension is null
    const errorWithCodeIsNull = API.handleGraphError({
      ...errorOptions,
      extensions: null,
    });

    expect(errorWithCodeIsNull).toEqual({
      code: null,
      message: errorOptions.message,
      path: errorOptions.path,
    });

    // error with code is UNAUTHENTICATED
    const errorUnAuthenticated = API.handleGraphError({
      ...errorOptions,
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });

    expect(errorUnAuthenticated).toEqual({
      code: 'UNAUTHENTICATED',
      message: errorOptions.message,
      path: errorOptions.path,
    });

    expect(onAuthErrorMock).toHaveBeenCalledTimes(1);
  });

  it('should handle auth errors', () => {
    // check onAuthMock
  });

  it('should handle default query', () => {

  });

  it('should handle default mutation', () => {
    
  });
});