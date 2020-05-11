import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('INVENTORY');

export const FETCH_INVENTORY = ns('FETCH_INVENTORY');
export const RESET = ns('RESET');

export const OBJECTS = {
  HOST: 'SAMPLE.HOST',
  VM: 'SAMPLE.VM',
};
