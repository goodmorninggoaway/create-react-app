import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

// Store Actions
const ns = actionNamespacer('CLUSTERS_COLLECTION');

export const FETCH_CLUSTERS = ns('FETCH_CLUSTERS');
export const RESET = ns('RESET');
export const CARD_BASE_HEIGHT = 145;
export const CARD_ROW_HEIGHT = 25;
