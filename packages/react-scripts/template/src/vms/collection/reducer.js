import {
  createReducersForAction,
  createSelector,
  getInitialState,
} from '@infosight/elmer/dist/utils/redux';
import { FETCH_VMS, RESET } from './constants';

// Initial state for vms list
const initialState = {
  ...getInitialState('vms'),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_VMS, stateKey: 'vms' }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.vmsCollection;

export const vmsSelector = createSelector(
  baseSelector,
  'vms'
);
