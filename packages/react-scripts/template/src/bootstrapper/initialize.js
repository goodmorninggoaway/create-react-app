import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { setStore } from '../utils/getStore';
import user from '../user/reducer';
import { loadTenant, loadUser } from '../user/actionsCreators';

const reducer = combineReducers({
  user,
  // add other reducers here
});

const store = createStore(
  reducer,
  {},
  composeWithDevTools({ name: 'microapp-id' })(applyMiddleware(thunk))
);

setStore(store);

export default async function load() {
  await loadTenant()(store.dispatch);
  await loadUser()(store.dispatch);
}
