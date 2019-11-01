import {
  getUserProfile,
  getActiveTenant,
} from '@infosight/shell-api/lib/UserProfile';
import { getConfig } from '@infosight/shell-api/lib/Config';
import {
  SET_EXPERIMENTAL,
  SET_TENANT,
  SET_USER,
  USER_CONTEXT_CHANGED,
} from './constants';

export const loadUser = () => async dispatch => {
  try {
    const user = await getUserProfile();
    dispatch({ type: SET_USER, payload: user });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const loadTenant = () => async dispatch => {
  try {
    const tenant = await getActiveTenant();
    dispatch({ type: SET_TENANT, payload: tenant });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const loadExperimental = () => async dispatch => {
  try {
    const config = await getConfig();
    dispatch({ type: SET_EXPERIMENTAL, payload: config.experimental });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const changeUserContext = () => ({ type: USER_CONTEXT_CHANGED });
