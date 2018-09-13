import networkEndpoints from './network_endpoints.json';
import { createNetworkError, createInvalidDataError, createAuthError } from '../error/errorUtils';

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
  // check for localhost / 127.0.0.1
  if (url.indexOf('localhost') || url.indexOf('127.0.0.1')) {
    return 'local';
  }

  return process.env.NODE_ENV;
} 

const getUrl = key => networkEndpoints[key][getEnv()];

// generic call definitions
const genericFetch = (url, config = {}) => {
  const newConfig = {
    ...defaultConfig,
    ...config,
  };

  return fetch(url, newConfig)
    .catch(error => Promise.reject(createNetworkError(error, undefined)))
    .then((response) => {
      const { status } = response;
      
      if (status === 401) {
        const error = createAuthError();
        return Promise.reject(error);
      } else if (status >= 300 || status < 200 ) {
        // invalid
        const message = `Network error detected, status code: ${status}`;
        const error = createNetworkError(new Error(message), response);
        return Promise.reject(error);
      }

      // if (!ok || status >= 300 || status < 200) {
      //   // invalid
      //   const message = `Network error detected, status code: ${status}`;
      //   const error = createNetworkError(new Error(message), response);
      //   return Promise.reject(error);
      // }

      return Promise.resolve(response);
    });
};

const genericJsonFetch = (url, config) =>
  genericFetch(url, config)
    // stop if generic fetch fails
    .catch(error => Promise.reject(error))
    // get json response
    .then((response) => {
      return response.json()
        // handle invalid json payload
        .catch(error => Promise.reject(createInvalidDataError(error, response)));
    });
    

// network calls
// const getImages = () => {
//   const userId = '12d4cddc-2011-4a86-be10-f7e3286676f7';
//   const url = `${getUrl('api')}/user/${userId}/image/`;

//   return genericJsonFetch(url);
// }

export {
  defaultConfig,
  // getImages,
  getUrl,
  genericJsonFetch,
};
