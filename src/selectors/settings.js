import { createSelector } from 'reselect';

import { SETTING_KEY_SHOW_FACE_LABEL } from '../redux/settings';

const selectSettings = state => state.settings;

export const selectSettingByKey = createSelector(
  selectSettings,
  settings => settings.byKey,
);

export const selectFaceSetting = createSelector(
  selectSettingByKey,
  (byKey) => {
    const value = byKey[SETTING_KEY_SHOW_FACE_LABEL];

    if (!value) {
      return false;
    }

    return value;
  },
);
