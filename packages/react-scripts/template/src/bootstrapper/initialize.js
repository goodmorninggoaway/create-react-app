import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { setStore } from '../utils/getStore';
import sample from '../samples/reducer';

const reducer = combineReducers({
    // add reducers here
    sample,
});

const store = createStore(
    reducer,
    {},
    composeWithDevTools({ name: process.env.REACT_APP_MICROAPP_ID })(applyMiddleware(thunk)),
);

setStore(store);

export default async function load() {
}
