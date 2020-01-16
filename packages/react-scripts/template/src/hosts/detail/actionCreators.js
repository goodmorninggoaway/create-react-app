import { actionsFor } from '@infosight/elmer/dist/utils/redux';
import { FETCH_HOST } from './constants';

// Function for dispatching actions
export const fetchHost = hostId => async dispatch => {
  const { dispatchStart, dispatchSuccess, dispatchError } = actionsFor(
    FETCH_HOST,
    dispatch
  );
  dispatchStart();
  try {
    // You should replace this with an actual call to an API
    // const response = await fetch(`/api/sample/host/${hostId}`);
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
      ].filter(obj => obj.id === hostId),
    };
    dispatchSuccess(response.data);
  } catch (e) {
    dispatchError(e);
  }
};
