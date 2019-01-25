import { createSelector } from 'reselect';

const messageStateSelector = state => state.application.message;

export const showMessageSelector = createSelector(
  messageStateSelector,
  ({ show }) => show,
);

export const messageTextSelector = createSelector(
  messageStateSelector,
  ({ text }) => text,
);
