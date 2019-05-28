import applicationReducer from './application';
import authReducer from './auth';
import imagesReducer from './images';
import labelsReducer from './labels';
import facesReducer from './faces';
import userReducer from './user';

const staticReducers = {
  /**
   * Do not use Date.now as pointer to prevent
   * jest mock issues (by using pointer jest mock cannot
   * replace function call)
   */
  appTime: () => Date.now(),
  application: applicationReducer,
  auth: authReducer,
  images: imagesReducer,
  labels: labelsReducer,
  faces: facesReducer,
  user: userReducer,
};

export default staticReducers;
