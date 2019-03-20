import * as networkUtils from '../services/networkUtils';

import networkEndpoints from '../services/network_endpoints.json';
import { createNetworkError, createInvalidDataError } from '../ErrorHandler';

const defaultUrl = 'https://my-custom-api';
const defaultConfig = {
  method: 'GET',
  cors: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

it('should return dev url for graph api', () => {
  expect(networkEndpoints['graphql']['development']).toEqual(networkUtils.getUrl('graphql'));
});

describe('test genericFetch', () => {
  const mockSuccessResponse = JSON.stringify({
    data: {
      query: {
        now: '2019-02-09T08:12:11.736Z',
      },
    },
  });

  beforeEach(() => {
    fetch.resetMocks()
  });

  it('default config fetch call should succeed', async () => {
    // mock first
    fetch.mockResponseOnce(mockSuccessResponse);

    const response = await networkUtils.genericFetch(defaultUrl);

    // check default behaviour
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(defaultUrl);
    expect(fetch.mock.calls[0][1]).toEqual(defaultConfig);

    // check content
    expect(response.body).toEqual(mockSuccessResponse);
  });

  it('custom config fetch call should succeed', async () => {
    // mock first
    fetch.mockResponseOnce(mockSuccessResponse);

    // config
    const config = {
      method: 'POST',
      cors: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await networkUtils.genericFetch(defaultUrl, config);

    // check default behaviour
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(defaultUrl);
    expect(fetch.mock.calls[0][1]).toEqual(config);

    // check content
    expect(response.body).toEqual(mockSuccessResponse);
  });

  it('should handle basic network issues', async () => {
    const error = new Error('Custom Network Error');

    // mock first
    fetch.mockReject(error);

    try {
      await networkUtils.genericFetch(defaultUrl);
    } catch (requestError) {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(defaultUrl);

      // check for error
      expect(requestError).toEqual(createNetworkError(error, undefined));
    }
  });

  it('should handle wrong network status', async () => {
    const getErrorMessage = status => `Network error detected, status code: ${status}`;

    // mock responses
    fetch.mockResponses(
      [
        mockSuccessResponse,
        { status: 300 }
      ],
      [
        mockSuccessResponse,
        { status: 100 }
      ],
    );

    // test for status code >= 300
    try {
      await networkUtils.genericFetch(defaultUrl);
    } catch (requestError) {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(defaultUrl);

      expect(requestError).toEqual(createNetworkError(new Error(getErrorMessage(300)), mockSuccessResponse));
    }

    // test for status code < 200
    try {
      await networkUtils.genericFetch(defaultUrl);
    } catch (requestError) {
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[1][0]).toEqual(defaultUrl);

      expect(requestError).toEqual(createNetworkError(new Error(getErrorMessage(100)), mockSuccessResponse));
    }
  });

  describe('test genericJsonFetch', () => { 
    const mockSuccessData = {
      data: {
        query: {
          now: '2019-02-09T08:12:11.736Z',
        },
      },
    };
  
    beforeEach(() => {
      fetch.resetMocks()
    });
  
    it('default config fetch call should succeed', async () => {
      // mock first
      fetch.mockResponseOnce(JSON.stringify(mockSuccessData));
  
      const response = await networkUtils.genericJsonFetch(defaultUrl);
  
      // check default behaviour
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(defaultUrl);
      expect(fetch.mock.calls[0][1]).toEqual(defaultConfig);
  
      // check content
      expect(response).toEqual(mockSuccessData);
    });

    it('should handle invalid json data', async () => {
      // mock first
      fetch.mockResponseOnce(mockSuccessData); // don't create valid JSON here

      try {
      await networkUtils.genericJsonFetch(defaultUrl);
      } catch(requestError) {
        // check default behaviour
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual(defaultUrl);
        expect(fetch.mock.calls[0][1]).toEqual(defaultConfig);

        expect(requestError).toEqual(createInvalidDataError(requestError, mockSuccessData));
      }
    });
  });
});
