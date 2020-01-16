import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('VMS_COLLECTION');

export const FETCH_VMS = ns('FETCH_VMS');
export const RESET = ns('RESET');
