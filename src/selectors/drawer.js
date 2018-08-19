import { createSelector } from 'reselect';

const selectDrawerState = state => state.drawer;

export const selectDrawerOpen = createSelector(
  selectDrawerState,
  drawer => drawer.open,
);
