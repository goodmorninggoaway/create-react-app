import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('VM_DETAILS');

export const FETCH_VM = ns('FETCH_VM');
export const RESET = ns('RESET');
