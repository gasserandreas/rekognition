import { getVersionedUrl, defaultConfig, genericJsonFetch } from './networkUtils';

import { createAuthError } from '../error/errorUtils';
import { getUserId } from '../sessionUtils';
import { handleError } from '../error/errorMiddleware';

import { networkRequestStart, networkRequestComplete } from '../../redux/network';

export default dispatch => (path, options = {}) => {
  // create config
  const config = {
    ...defaultConfig,
    ...options,
  };

  // create url
  const baseUrl = getVersionedUrl('api');
  const userId = getUserId();

  if (!userId) {
    return Promise.reject(createAuthError());
  }

  const url = `${baseUrl}/user/${userId}/${path}`;

  // handle network
  dispatch(networkRequestStart());

  return genericJsonFetch(url, config)
    .then(data => {
      dispatch(networkRequestComplete());
      return Promise.resolve(data);
    })
    .catch((error) => {
      // fire error handler
      dispatch(handleError(error));
      dispatch(networkRequestComplete());
      return Promise.reject(error);
    });
};
