import { createStore, applyMiddleware, compose  } from 'redux';
import root from './reducers/index';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

const store = createStore(root, composeEnhancers(applyMiddleware(thunk)));

export default store;
