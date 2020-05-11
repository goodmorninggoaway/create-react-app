import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_VMS } from './constants';

// Function for dispatching actions
export const fetchVms = ({ scope }) => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_VMS, dispatch);
  dispatchStart();
  try {
    // You should replace this with an actual call to an API
    // const response = await fetch(`/api/sample/vms?scope=${scope.id}`);
    const response = {
      data: [
        {
          id: '10000003',
          name: 'Sample VM 1',
          hostId: '10000001',
          hostName: 'Sample Host 1',
          iopsAvg: 141.63234,
          latencyAvgMs: 0.27234,
          latencyMaxMs: 3.00234234,
        },
        {
          id: '10000004',
          name: 'Sample VM 2',
          hostId: '10000001',
          hostName: 'Sample Host 1',
          iopsAvg: 0.06,
          latencyAvgMs: 0.124234,
          latencyMaxMs: 2.00234,
        },
        {
          id: '10000005',
          name: 'Sample VM 3',
          hostId: '10000002',
          hostName: 'Sample Host 2',
          iopsAvg: 60.13,
          latencyAvgMs: 0.36234,
          latencyMaxMs: 2.13242,
        },
      ].filter(vm => !scope || scope.id === vm.hostId),
    };
    dispatchSuccess(response.data);
  } catch (e) {
    dispatchError(e);
  }
};
