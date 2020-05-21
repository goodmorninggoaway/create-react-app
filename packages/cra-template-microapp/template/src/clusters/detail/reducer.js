import { createReducersForAction, createSelector, getInitialState } from '@infosight/elmer/dist/utils/redux';
import { FETCH_CLUSTER, RESET } from './constants';

const initialState = {
  ...getInitialState('cluster'),
  error: {},
};

const ACTION_HANDLERS = {
  [RESET]: () => initialState,
  ...createReducersForAction({ type: FETCH_CLUSTER, stateKey: 'cluster' }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.clustersDetails;

export const clusterSelector = createSelector(baseSelector, 'cluster');
