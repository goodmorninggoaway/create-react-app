import { createReducersForAction, createSelector, getInitialState } from '@infosight/elmer/dist/utils/redux';
import { CLUSTERS_FETCH, RESET } from './constants';

const CLUSTERS_KEY = 'clustersSummary';

// Initial state for hosts list
const initialState = {
  ...getInitialState(CLUSTERS_KEY),
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: CLUSTERS_FETCH, stateKey: CLUSTERS_KEY }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.clusterCollection;

export const clustersSelector = createSelector(baseSelector, CLUSTERS_KEY);
