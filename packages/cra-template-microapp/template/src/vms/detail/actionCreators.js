import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_VM } from './constants';
import mockVmData from '../vmMockData';
// Function for dispatching actions
export const fetchVm = vmId => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_VM, dispatch);
  dispatchStart();
  try {
    // You should replace mockVmData with an actual call to an API
    // const response = await fetch(`/api/sample/vm/${vmId}`);
    dispatchSuccess(mockVmData.data.filter(obj => obj.id === vmId));
  } catch (e) {
    dispatchError(e);
  }
};
