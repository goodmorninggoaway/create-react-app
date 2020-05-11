import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import sample from '../samples/reducer';
import inventory from '../inventory/reducer';
import hostsCollection from '../hosts/collection/reducer';
import hostsDetails from '../hosts/detail/reducer';
import vmsCollection from '../vms/collection/reducer';
import vmsDetails from '../vms/detail/reducer';
import user from '../user/reducer';

const reducer = combineReducers({
  // add reducers here
  sample,
  inventory,
  hostsCollection,
  hostsDetails,
  vmsCollection,
  vmsDetails,
  user,
});

export default createStore(reducer, {}, composeWithDevTools({ name: process.env.REACT_APP_MICROAPP_ID })(applyMiddleware(thunk)));
