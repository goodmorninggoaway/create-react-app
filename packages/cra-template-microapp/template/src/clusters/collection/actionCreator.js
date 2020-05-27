import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { mockClusterData } from '../clusterMockData';
import { CLUSTERS_FETCH, RESET } from './constants';

export function fetchClusterCards() {
  return dispatch => {
    const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(CLUSTERS_FETCH, dispatch);
    dispatchStart();
    try {
      dispatchSuccess({
        clusters: mockClusterData.clusters,
      });
    } catch (e) {
      dispatchError(e);
    }
  };
}

export function reset() {
  return { type: RESET };
}
