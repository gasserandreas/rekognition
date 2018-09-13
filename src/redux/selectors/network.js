import { createSelector } from 'reselect';

const selectNetworkState = state => state.network;

const selectNetworkRequests = createSelector(
  selectNetworkState,
  state => state.requests,
);

const selectNetworkWorking = createSelector(
  selectNetworkRequests,
  request => {
    const { ids } = request; 

    return ids.length > 0;
  }
);

export {
  selectNetworkWorking,
};
