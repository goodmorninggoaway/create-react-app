import { USER_CONTEXT_CHANGED, SET_USER, SET_TENANT, SET_EXPERIMENTAL, INTERNAL_REALM } from './constants';
import createAuthz from '../utils/createAuthz';

const initialState = {
  user: null,
  tenant: null,
  experimental: false,
};

const ACTION_HANDLERS = {
  [USER_CONTEXT_CHANGED]: () => initialState,
  [SET_USER]: (state, { payload }) => ({ ...state, user: payload }),
  [SET_TENANT]: (state, { payload }) => ({ ...state, tenant: payload }),
  [SET_EXPERIMENTAL]: (state, { payload }) => ({
    ...state,
    experimental: payload,
  }),
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

// Selectors
const baseSelector = state => state.user;
export const userSelector = state => baseSelector(state).user;
export const tenantSelector = state => baseSelector(state).tenant;
export const experimentalSelector = state => baseSelector(state).experimental;

const sessionSelector = state => (userSelector(state) ? userSelector(state).session : null);
export const authzSelector = state => createAuthz(sessionSelector(state));
export const isInternalUserFromSession = session => session && session.userRealm === INTERNAL_REALM;
export const isInternalUser = state => isInternalUserFromSession(sessionSelector(state));
