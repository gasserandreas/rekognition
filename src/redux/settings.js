import { combineReducers } from "redux";

export const SETTING_KEY_SHOW_FACE_LABEL = 'SETTING_KEY_SHOW_FACE_LABEL';

// action types
const SETTINGS_SET = 'SETTINGS_SET';

// simple actions
const settingsSet = (key, value) => ({
  type: SETTINGS_SET,
  key,
  value,
});

// complex actions
const setSettingShowFaceLabel = value => (dispatch) => {
  dispatch(settingsSet(SETTING_KEY_SHOW_FACE_LABEL, value));
};

// reducers
const byKey = (state = {}, action) => {
  switch (action.type) {
    case SETTINGS_SET:
      return {
        ...state,
        [action.key]: action.value,
      }
    default:
      return state;
  }
};

export {
  setSettingShowFaceLabel,
};

export default combineReducers({
  byKey,
});
