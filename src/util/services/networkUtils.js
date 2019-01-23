import networkEndpoints from './network_endpoints.json';
import { createNetworkError, createInvalidDataError } from '../ErrorHandler';

const defaultConfig = {
  method: 'GET',
  cors: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const getEnv = () => {
  const url = window.location.href.toLowerCase();
  
  console.log(url);
  console.log(url.indexOf('localhost'));

  // check for localhost / 127.0.0.1
  if (url.indexOf('localhost') || url.indexOf('127.0.0.1')) {
    return 'local';
    // return 'development';
  }
  
  if (url.indexOf('rekognition-test.gasserandreas.com')) {
    return 'test';
  }

  return 'prod';
  // return process.env.NODE_ENV;
};

export const getUrl = key => {
  const url = networkEndpoints[key][getEnv()];
  return url;
};

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
  .then((response) => response.json()
  // handle invalid json payload
    .catch(error => Promise.reject(createInvalidDataError(error, response))));


export default {
  getUrl,
  genericFetch,
  genericJsonFetch,
};
