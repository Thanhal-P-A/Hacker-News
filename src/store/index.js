import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';

import Reducer from '../reducers';

const AppReducers = combineReducers(Reducer);

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  compose(applyMiddleware(logger)),
);

const persistor = persistStore(store);

export {store, persistor};
