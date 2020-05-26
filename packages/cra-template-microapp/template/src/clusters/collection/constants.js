import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

// Store Actions
const ns = actionNamespacer('CLUSTERS_COLLECTION');

export const CLUSTERS_FETCH = ns('CLUSTERS_FETCH');
export const RESET = ns('RESET');
export const MAX_NUM_HOST_ROWS = 10;
export const CARD_BASE_HEIGHT = 145;
export const CARD_ROW_HEIGHT = 25;
