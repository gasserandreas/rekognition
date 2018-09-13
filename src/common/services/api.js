import { getUrl, defaultConfig, genericJsonFetch } from './networkUtils';

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
  const baseUrl = getUrl('api');
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

// export default onError => (urlPath, opts = {}) => {
//   // create config
//   const config = {
//     ...defaultConfig,
//     ...opts,
//   };

//   console.log(sessionStorage.getItem('userId'));

//   // create url
//   const baseUrl = getUrl('api');
//   const userId = getUserId();

//   if (!userId) {
//     return Promise.reject(createAuthError());
//   }

//   const url = `${baseUrl}/user/${userId}/${urlPath}`;

//   return genericJsonFetch(url, config)
//     .then(data => {
//       console.log(data);
//       return Promise.resolve(data);
//     })
//     .catch((error) => {
//       // fire error handler
//       onError(error);

//       throw error;
//     });
// };
