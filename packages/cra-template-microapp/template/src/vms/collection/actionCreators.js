import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_VMS } from './constants';
import mockVmData from '../vmMockData';

// Function for dispatching actions
export const fetchVms = ({ scope }) => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_VMS, dispatch);
  dispatchStart();
  try {
    // You should replace mockVmData with an actual call to an API
    // const response = await fetch(`/api/sample/vms?scope=${scope.id}`);

    dispatchSuccess(mockVmData.data.filter(vm => !scope || scope.id === vm.hostId));
  } catch (e) {
    dispatchError(e);
  }
};
