import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { setStore } from '../utils/getStore';

const reducer = combineReducers({});

const store = createStore(
  reducer,
  {},
  composeWithDevTools({ name: 'microapp-id' })(applyMiddleware(thunk))
);

setStore(store);

export default async function load() {}
