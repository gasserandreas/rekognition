import applicationReducer from './application';
import authReducer from './auth';

const staticReducers = {
  /**
   * Do not use Date.now as pointer to prevent
   * jest mock issues (by using pointer jest mock cannot
   * replace function call)
   */
  appTime: () => Date.now(),
  application: applicationReducer,
  auth: authReducer,
};

export default staticReducers;
