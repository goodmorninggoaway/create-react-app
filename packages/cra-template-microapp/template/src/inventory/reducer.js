import { createReducersForAction, createSelector } from '@infosight/elmer/dist/utils/redux';
import { FETCH_INVENTORY, RESET } from './constants';
import { USER_CONTEXT_CHANGED } from '../user/constants';
import store from '../bootstrapper/store';

const initialState = {
  objects: { flat: null, index: null, indexedDescendants: null },
};

const ACTION_HANDLERS = {
  [USER_CONTEXT_CHANGED]: () => initialState,
  ...createReducersForAction({ type: FETCH_INVENTORY, stateKey: 'objects' }),
  [RESET]: () => initialState,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

const baseSelector = state => state.inventory;

export const inventorySelector = createSelector(baseSelector, 'objects');

export const flatSelector = state => (baseSelector(state).objects ? baseSelector(state).objects.flat : []);
export const indexedSelector = state => baseSelector(state).objects.index;
export const descendantsSelector = state => baseSelector(state).objects.topology;

export const findObject = (type, id) => {
  const { objects } = inventorySelector(store.getState());
  if (!objects || !objects.index) {
    return undefined;
  }

  const { index } = objects;
  const object = index && index[type] && index[type][id];
  return object || undefined;
};

export const getObjectTopology = (type, id) => {
  const { objects } = inventorySelector(store.getState());
  if (!objects || !objects.topology) {
    return undefined;
  }

  const { topology } = objects;
  const relations = topology && topology[type] && topology[type][id];
  return relations || undefined;
};

export const inventoryLoadedSelector = state => {
  const it = inventorySelector(state);
  return it && it.loadedObjects;
};
