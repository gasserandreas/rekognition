import { createSelector } from 'reselect';

import { applicationStateSelector } from '../selectors';

export const messageStateSelector = createSelector(
  applicationStateSelector,
  ({ message }) => message || {},
);

export const messageShowSelector = createSelector(
  messageStateSelector,
  ({ show }) => show,
);

export const messageTextSelector = createSelector(
  messageStateSelector,
  ({ text }) => text,
);

export const messageTitleSelector = createSelector(
  messageStateSelector,
  ({ title }) => title,
);

export const messageShowRefreshSelector = createSelector(
  messageStateSelector,
  ({ showRefresh }) => showRefresh,
);
