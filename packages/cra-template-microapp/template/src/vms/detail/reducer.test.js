import { getSuccessActionType, getErrorActionType } from '@infosight/elmer/dist/utils/redux';

import reducer from './reducer';
import { FETCH_VM } from './constants';

describe('Vm details reducer', () => {
  it('updates the list of vms on data success', () => {
    const newState = reducer(undefined, { type: getSuccessActionType(FETCH_VM), payload: [{ vmId: '123', name: 'Bob' }] });

    expect(newState.vm).toHaveLength(1);
    expect(newState.vm[0].name).toBe('Bob');
  });

  it('saves the error and sets the error state when their is a failure', () => {
    const newState = reducer(undefined, { type: getErrorActionType(FETCH_VM), payload: 'GOOD GRACIOUS GRAVY THE WHOLE DATACENTER IS ON FIRE!' });

    expect(newState.vm).toBeFalsy();
    expect(newState.errorVm).toBeTruthy();
    expect(newState.error).toBe('GOOD GRACIOUS GRAVY THE WHOLE DATACENTER IS ON FIRE!');
  });
});
