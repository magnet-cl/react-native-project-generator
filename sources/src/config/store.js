import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import { apiHeaders, apiResponse } from './middlewares';
import { middleware as navMiddleware } from '../navigation/utils';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: ['navigation'],
};

const persitedCombinedReducers = persistCombineReducers(persistConfig, reducers);

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default createStore(
  persitedCombinedReducers,
  composeEnhancers(applyMiddleware(thunk, apiHeaders, apiMiddleware, apiResponse, navMiddleware)),
);
