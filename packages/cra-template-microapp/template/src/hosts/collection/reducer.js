import { createReducersForAction, createSelector, getInitialState } from '@infosight/elmer/dist/utils/redux';
import { FETCH_HOSTS, RESET } from './constants';

// Initial state for hosts list
const initialState = {
  ...getInitialState('hosts'),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_HOSTS, stateKey: 'hosts' }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.hostsCollection;

export const hostsSelector = createSelector(baseSelector, 'hosts');
