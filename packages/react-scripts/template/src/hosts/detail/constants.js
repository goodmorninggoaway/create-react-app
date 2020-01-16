import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('HOST_DETAILS');

export const FETCH_HOST = ns('FETCH_HOST');
export const RESET = ns('RESET');
