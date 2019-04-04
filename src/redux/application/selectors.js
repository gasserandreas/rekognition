import { createSelector } from 'reselect';

export const applicationStateSelector = state => state.application;

export const applicationStatusSelector = createSelector(
  applicationStateSelector,
  ({ status }) => status,
);