import networkEndpoints from './network_endpoints.json';
import { getWindowUrl } from './windowUtils';
import { createNetworkError, createInvalidDataError } from '../ErrorHandler';

const defaultConfig = {
  method: 'GET',
  cors: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// const getWindowUrl = () => window.location.href.toLowerCase();

const getEnv = () => {
  const url = getWindowUrl().toLowerCase();

  // check for localhost / 127.0.0.1
  if (url.indexOf('localhost') >= 0) {
    // return 'local';
    return 'development';
  }

  if (url.indexOf('127.0.0.1') >= 0) {
    return 'local';
  }

  if (url.indexOf('rekognition-test.gasserandreas.com') >= 0) {
    return 'test';
  }

  return 'prod';
  // return process.env.NODE_ENV;
};

export const getUrl = key => networkEndpoints[key][getEnv()];

// generic call definitions
export const genericFetch = (url, config = {}) => {
  const newConfig = {
    ...defaultConfig,
    ...config,
  };

  return fetch(url, newConfig)
    .catch(error => Promise.reject(createNetworkError(error, undefined)))
    .then((response) => {
      const { ok, status } = response;
      if (!ok || status >= 300 || status < 200) {
        // invalid
        const message = `Network error detected, status code: ${status}`;
        const error = createNetworkError(new Error(message), response);
        return Promise.reject(error);
      }

      return Promise.resolve(response);
    });
};

export const genericJsonFetch = (url, config) => genericFetch(url, config)
// stop if generic fetch fails
  .catch(error => Promise.reject(error))
// get json response
  .then(response => response
    .json()
  // handle invalid json payload
    .catch(error => Promise.reject(createInvalidDataError(error, response))));

export const __testables__ = {
  // eslint-disable-line no-underscore-dangle
  getEnv,
  getWindowUrl,
};

export default {
  getUrl,
  genericFetch,
  genericJsonFetch,
};
