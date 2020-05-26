import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_HOST } from './constants';
import hostMockData from '../hostMockData';

// Function for dispatching actions
export const fetchHost = hostId => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(FETCH_HOST, dispatch);
  dispatchStart();
  try {
    // You should replace this with an actual call to an API
    // const response = await fetch(`/api/sample/host/${hostId}`);
    dispatchSuccess(hostMockData.data.filter(obj => obj.id === hostId));
  } catch (e) {
    dispatchError(e);
  }
};
