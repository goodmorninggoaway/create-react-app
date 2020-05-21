import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('CLUSTER_DETAILS');

export const FETCH_CLUSTER = ns('FETCH_CLUSTER');
export const RESET = ns('RESET');
