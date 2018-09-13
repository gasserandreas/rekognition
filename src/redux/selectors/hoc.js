// import { createSelector } from 'reselect';

export const createRequestStateSelector = key => (state) => state[key].fetchRequest;