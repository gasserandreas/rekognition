import { createSelector } from 'reselect';

export const messageStateSelector = state => state.application.message;

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
