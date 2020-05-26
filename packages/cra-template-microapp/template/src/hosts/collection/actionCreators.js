import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_HOSTS } from './constants';
import hostMockData from '../hostMockData';
// Function for dispatching actions
export const fetchHosts = () => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_HOSTS, dispatch);
  dispatchStart();
  try {
    // You should replace hostMockData with an actual call to an API
    // const response = await fetch('/api/sample/hosts');
    dispatchSuccess(hostMockData.data);
  } catch (e) {
    dispatchError(e);
  }
};
