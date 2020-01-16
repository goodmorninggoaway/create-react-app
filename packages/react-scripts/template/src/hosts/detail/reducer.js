import {
  createReducersForAction,
  createSelector,
  getInitialState,
} from '@infosight/elmer/dist/utils/redux';
import { FETCH_HOST, RESET } from './constants';

// Initial state for hosts list
const initialState = {
  ...getInitialState('host'),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_HOST, stateKey: 'host' }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.hostsDetails;

export const hostSelector = createSelector(
  baseSelector,
  'host'
);
