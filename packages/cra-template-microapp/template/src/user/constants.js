import { actionNamespacer } from '@infosight/elmer/dist/utils/redux';

const ns = actionNamespacer('USER');
export const USER_CONTEXT_CHANGED = ns('USER_CONTEXT_CHANGED');
export const SET_USER = ns('SET_USER');
export const SET_TENANT = ns('SET_TENANT');
export const SET_EXPERIMENTAL = ns('SET_EXPERIMENTAL');

export const INTERNAL_REALM = 'INTERNAL';
export const EXTERNAL_REALM = 'EXTERNAL';
