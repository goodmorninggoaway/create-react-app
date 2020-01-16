import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_HOSTS } from './constants';

// Function for dispatching actions
export const fetchHosts = () => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(
    FETCH_HOSTS,
    dispatch
  );
  dispatchStart();
  try {
    // You should replace this with an actual call to an API
    // const response = await fetch('/api/sample/hosts');
    const response = {
      data: [
        {
          id: '10000001',
          serialNumber: '10000001',
          name: 'Sample Host 1',
          model: 'XYZ PDQ',
        },
        {
          id: '10000002',
          serialNumber: '10000002',
          name: 'Sample Host 2',
          model: 'XYZ 10000',
        },
      ],
    };
    dispatchSuccess(response.data);
  } catch (e) {
    dispatchError(e);
  }
};
