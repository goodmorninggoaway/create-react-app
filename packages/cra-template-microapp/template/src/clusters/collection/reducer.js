import { createReducersForAction, createSelector, getInitialState } from '@infosight/elmer/dist/utils/redux';
import { FETCH_CLUSTERS, RESET } from './constants';

const CLUSTERS_KEY = 'clusters';

// Initial state for hosts list
const initialState = {
  ...getInitialState(CLUSTERS_KEY),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_CLUSTERS, stateKey: CLUSTERS_KEY }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.clusterCollection;

export const clustersSelector = createSelector(baseSelector, CLUSTERS_KEY);
