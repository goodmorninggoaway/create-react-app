import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_CLUSTERS } from './constants';
import { mockClusterData } from '../clusterMockData';
// Function for dispatching actions
export const fetchClusters = () => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_CLUSTERS, dispatch);
  dispatchStart();
  try {
    const response = {
      data: mockClusterData.data,
    };
    dispatchSuccess(response.data);
  } catch (e) {
    dispatchError(e);
  }
};
