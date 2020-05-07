import {
  createReducersForAction,
  createSelector,
  getInitialState,
} from '@infosight/elmer/dist/utils/redux';
import { FETCH_VM, RESET } from './constants';

// Initial state for vms list
const initialState = {
  ...getInitialState('vm'),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_VM, stateKey: 'vm' }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.vmsDetails;

export const vmSelector = createSelector(
  baseSelector,
  'vm'
);
