import { createReducersForAction, createSelector, getInitialState } from '@infosight/elmer/dist/utils/redux';
import { FETCH_CLUSTER, RESET } from './constants';

const CLUSTER_KEY = 'cluster';

const initialState = {
  ...getInitialState(CLUSTER_KEY),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_CLUSTER, stateKey: CLUSTER_KEY }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.clustersDetails;

export const clusterSelector = createSelector(baseSelector, CLUSTER_KEY);
