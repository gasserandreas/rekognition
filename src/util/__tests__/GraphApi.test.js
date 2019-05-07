/* global testUtils */
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import * as apolloLinkContext from 'apollo-link-context';

import GraphApi, { __testables__ } from '../GraphApi';

import { createNetworkError } from '../ErrorHandler';
import * as sessionUtil from '../sessionUtil';

describe('GraphApi test suite', () => {
  const mockedData = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzBkZDIxNS1hNWY2LTRiMzItYmI4MS1jZjFlOGVjODkwMzkiLCJjcmVhdGVkQXQiOjE1NTMyMDEwMjM5NzYsImlhdCI6MTU1MzIwMTAyM30.CI1ZSQodWkuGMAQJQRZ5F7bGFKJHTWj-ql0f_INVALID',
    endpoint: 'https://graph/api/endpoint',
  };

  let getTokenMock;
  let onAuthErrorMock;
  let setContextMock;

  beforeAll(() => {
    getTokenMock = jest.spyOn(sessionUtil, 'getToken').mockImplementation(() => mockedData.token);
    onAuthErrorMock = jest.fn();
    setContextMock = jest.spyOn(apolloLinkContext, 'setContext');
  });

  afterEach(() => {
    getTokenMock.mockClear();
    onAuthErrorMock.mockClear();
    setContextMock.mockClear();
  });

  afterAll(() => {
    getTokenMock.mockRestore();
    onAuthErrorMock.mockRestore();
    setContextMock.mockRestore();
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
    expect(__testables__.getAuthToken(null, initialHeader)).toEqual(expectedHeaderWithToken);

    // check for without token
    getTokenMock = getTokenMock.mockImplementation(() => null);

    const expectedHeaderWithoutToken = {
      headers: {
        ...initialHeader.headers,
        authorization: '',
      },
    };

    expect(__testables__.getAuthToken(null, initialHeader)).toEqual(expectedHeaderWithoutToken);
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

  describe('GraphAPI reset test suite', () => {
    let API;

    let resetStoreMock;

    beforeAll(() => {
      API = new GraphApi({
        endpoint: mockedData.endpoint,
        onAuthError: onAuthErrorMock,
      });

      resetStoreMock = jest.spyOn(API.client, 'resetStore').mockImplementation(() => true);
    });

    afterEach(() => {
      resetStoreMock.mockClear();
    });

    afterAll(() => {
      resetStoreMock.mockRestore();
    });

    it('should allow reset the API', () => {
      API.reset();

      expect(resetStoreMock).toHaveBeenCalledTimes(1);

      // remove link and try again to reset
      API.client = null;
      API.reset();

      expect(resetStoreMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('GraphAPI handleGraphError test suite', () => {
    const errorOptions = {
      extensions: {
        code: '',
      },
      message: 'error message',
      path: '/base/path',
    };

    let API;

    beforeAll(() => {
      API = new GraphApi({
        endpoint: mockedData.endpoint,
        onAuthError: onAuthErrorMock,
      });
    });

    it('should handle default GraphQL error', () => {
      // basic error handling
      const error = API.handleGraphError(errorOptions);

      expect(error).toEqual({
        code: errorOptions.extensions.code,
        message: errorOptions.message,
        path: errorOptions.path,
      });
    });

    it('should handle GraphQL error without error code', () => {
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
    });

    it('should handle UNAUTHENTICATED GraphQL errors', () => {
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
  });

  describe('GraphAPI handleResponse test suite', () => {
    let API;
    let handleGraphErrorMock;

    beforeEach(() => {
      API = new GraphApi({
        endpoint: mockedData.endpoint,
        onAuthError: onAuthErrorMock,
      });

      handleGraphErrorMock = jest.spyOn(API, 'handleGraphError').mockImplementation(obj => obj);
    });

    afterEach(() => {
      handleGraphErrorMock.mockRestore();
    });

    it('should handle default response', async (done) => {
      const data = {
        attr1: 'attr1',
        attr2: 'attr2',
      };

      const response = {
        data,
        errors: [],
      };

      const receivedData = await API.handleResponse(response);
      expect(receivedData).toEqual(data);
      done();
    });

    it('should handle response with missing error object', async (done) => {
      const data = {
        attr1: 'attr1',
        attr2: 'attr2',
      };

      const response = {
        data,
      };

      const receivedData = await API.handleResponse(response);
      expect(receivedData).toEqual(data);
      expect(handleGraphErrorMock).not.toHaveBeenCalled();
      done();
    });

    it('should handle response with one error', async (done) => {
      const error = new Error('one error');
      const response = {
        data: {},
        errors: [error],
      };

      try {
        await API.handleResponse(response);
      } catch (caughtError) {
        expect(handleGraphErrorMock).toHaveBeenCalledTimes(1);
        expect(handleGraphErrorMock).toHaveBeenCalledWith(error);
      }
      done();
    });

    it('should handle response with multiple errors', async (done) => {
      const error1 = new Error('first error');
      const error2 = new Error('second error');
      const errors = [error1, error2];

      const response = {
        data: {},
        errors,
      };

      try {
        await API.handleResponse(response);
      } catch (caughtError) {
        expect(handleGraphErrorMock).toHaveBeenCalledTimes(errors.length);

        // check call arguments
        errors.forEach((error, i) => {
          expect(handleGraphErrorMock).toHaveBeenNthCalledWith(i + 1, errors[i]);
        });
      }
      done();
    });
  });

  describe('GraphApi query test suite', () => {
    const GET_DATA_QUERY = gql`
      query getData($var1: ID!, $var2: String!) {
        getData(var1: $var1, var2: $var2) {
          attr1
          attr2
          attr3
        }
      }
    `;

    const variables = {
      var1: 'some',
      var2: 'content',
    };

    const response = {
      data: {
        attr1: 'attr1',
        attr2: 'attr2',
        attr3: 'attr3',
      },
    };

    let API;
    let handleResponseMock;
    let handleNetworkErrorMock;
    let graphApiQueryMock;

    beforeAll(() => {
      // init API
      API = new GraphApi({
        endpoint: mockedData.endpoint,
        onAuthError: onAuthErrorMock,
      });

      // general respons handler mock
      handleNetworkErrorMock = jest.spyOn(API, 'handleNetworkError').mockImplementation(() => ({}));
      handleResponseMock = jest.spyOn(API, 'handleResponse').mockImplementation(() => ({}));
    });

    afterEach(() => {
      graphApiQueryMock && graphApiQueryMock.mockClear();
    });

    afterAll(() => {
      handleNetworkErrorMock.mockClear();
      handleResponseMock.mockClear();
    });

    it('should handle query', async (done) => {
      // test happy path
      graphApiQueryMock = jest.spyOn(API.client, 'query').mockImplementationOnce(() => Promise.resolve(response));

      await API.query(GET_DATA_QUERY, variables);
      const call1 = graphApiQueryMock.mock.calls[0][0];

      // check generic query handling functions
      expect(call1.query).toEqual(GET_DATA_QUERY);
      expect(call1.variables).toEqual(variables);
      expect(call1.errorPolicy).toEqual('all');

      expect(handleNetworkErrorMock).not.toHaveBeenCalled();
      expect(handleResponseMock).toHaveBeenLastCalledWith(response);

      done();
    });

    it('should use empty variables object as default', async (done) => {
      // test happy path
      graphApiQueryMock = jest.spyOn(API.client, 'query').mockImplementationOnce(() => Promise.resolve(response));

      await API.query(GET_DATA_QUERY);
      const call1 = graphApiQueryMock.mock.calls[0][0];

      // check generic query handling functions
      expect(call1.variables).toEqual({});

      done();
    });

    it('should handle query with networkError', async (done) => {
      // check network error handling
      const error = new Error('test network error');
      graphApiQueryMock = jest.spyOn(API.client, 'query').mockImplementationOnce(() => Promise.reject(error));

      try {
        await API.query(GET_DATA_QUERY, variables);
      } catch (receivedError) {
        expect(handleNetworkErrorMock).toHaveBeenLastCalledWith(error);
        expect(handleResponseMock).not.toHaveBeenCalled();
      }

      done();
    });
  });

  describe('GraphApi mutation test suite', () => {
    const SET_DATA_MUTATION = gql`
      mutation setData($var1: ID!, $var2: String!) {
        setData(input: { var1: $var1, var2: $var2 }) {
          attr1
          attr2
          attr3
        }
      }
    `;

    const variables = {
      var1: 'some',
      var2: 'content',
    };

    const response = {
      data: {
        attr1: 'attr1',
        attr2: 'attr2',
        attr3: 'attr3',
      },
    };

    let API;
    let handleResponseMock;
    let handleNetworkErrorMock;
    let graphApiMutationMock;

    beforeAll(() => {
      // init API
      API = new GraphApi({
        endpoint: mockedData.endpoint,
        onAuthError: onAuthErrorMock,
      });

      // general respons handler mock
      handleNetworkErrorMock = jest.spyOn(API, 'handleNetworkError').mockImplementation(() => ({}));
      handleResponseMock = jest.spyOn(API, 'handleResponse').mockImplementation(() => ({}));
    });

    afterEach(() => {
      graphApiMutationMock && graphApiMutationMock.mockClear();
    });

    afterAll(() => {
      handleNetworkErrorMock.mockClear();
      handleResponseMock.mockClear();
    });

    it('should handle mutation', async (done) => {
      // test happy path
      graphApiMutationMock = jest.spyOn(API.client, 'mutate').mockImplementationOnce(() => Promise.resolve(response));

      await API.mutation(SET_DATA_MUTATION, variables);
      const call1 = graphApiMutationMock.mock.calls[0][0];

      // check generic query handling functions
      expect(call1.mutation).toEqual(SET_DATA_MUTATION);
      expect(call1.variables).toEqual(variables);
      expect(call1.errorPolicy).toEqual('all');

      expect(handleNetworkErrorMock).not.toHaveBeenCalled();
      expect(handleResponseMock).toHaveBeenLastCalledWith(response);

      done();
    });

    it('should use empty variables object as default', async (done) => {
      // test happy path
      graphApiMutationMock = jest.spyOn(API.client, 'mutate').mockImplementationOnce(() => Promise.resolve(response));

      await API.mutation(SET_DATA_MUTATION);
      const call1 = graphApiMutationMock.mock.calls[0][0];

      // check generic query handling functions
      expect(call1.variables).toEqual({});

      done();
    });

    it('should handle mutation with networkError', async (done) => {
      // check network error handling
      const error = new Error('test network error');
      graphApiMutationMock = jest.spyOn(API.client, 'mutate').mockImplementationOnce(() => Promise.reject(error));

      try {
        await API.mutation(SET_DATA_MUTATION, variables);
      } catch (receivedError) {
        expect(handleNetworkErrorMock).toHaveBeenLastCalledWith(error);
        expect(handleResponseMock).not.toHaveBeenCalled();
      }

      done();
    });
  });
});
