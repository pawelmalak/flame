import { combineReducers } from 'redux';

import { GlobalState } from '../../interfaces/GlobalState';

import themeReducer from './theme';
import appReducer from './app';
import bookmarkReducer from './bookmark';
import notificationReducer from './notification';

const rootReducer = combineReducers<GlobalState>({
  theme: themeReducer,
  app: appReducer,
  bookmark: bookmarkReducer,
  notification: notificationReducer
})

export default rootReducer;