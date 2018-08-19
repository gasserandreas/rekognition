import networkEndpoints from './network_endpoints.json';
import { createNetworkError, createInvalidDataError } from '../error/errorUtils';

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

const getUrl = key => {
  const apiVersion = 'v1';
  return `${networkEndpoints[key][getEnv()]}/${apiVersion}`;
};

const getUserUrl = userId => {
  return `${getUrl('api')}/user/${userId}`;
}

// generic call definitions
const genericFetch = (url, config = {}) => {
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
const uploadImage = (userId, image) => {
  const body = {
    imageId: image.id,
    filename: image.name,
    faces: image.faces,
    labels: image.labels,
  };

  console.log(image);

  const url = `${getUrl('api')}/user/${userId}/image`;
  const config = {
    ...defaultConfig,
    method: 'POST',
    body: JSON.stringify(body),
  };

  return genericJsonFetch(url, config);
};

const getImages = userId => {
  const url = `${getUserUrl(userId)}/image`;
  return genericJsonFetch(url, defaultConfig);
}

export {
  uploadImage,
  getImages,
};
