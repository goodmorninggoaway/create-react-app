import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_CLUSTER } from './constants';
import mockClusterData from '../clusterMockData';
// Function for dispatching actions
export const fetchCluster = clusterName => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_CLUSTER, dispatch);
  dispatchStart();
  try {
    // You should replace this with an actual call to an API
    // const response = await fetch(`/api/sample/cluster/${clusterName}`);
    const response = {
      data: mockClusterData.data.filter(obj => obj.name === clusterName),
    };
    dispatchSuccess(response.data);
  } catch (e) {
    dispatchError(e);
  }
};
