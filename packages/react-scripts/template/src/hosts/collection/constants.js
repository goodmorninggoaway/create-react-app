import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('HOSTS_COLLECTION');

export const FETCH_HOSTS = ns('FETCH_HOSTS');
export const RESET = ns('RESET');
