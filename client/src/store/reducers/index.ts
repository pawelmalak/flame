import { combineReducers } from 'redux';

import { GlobalState } from '../../interfaces/GlobalState';

import themeReducer from './theme';
import appReducer from './app';
import bookmarkReducer from './bookmark';

const rootReducer = combineReducers<GlobalState>({
  theme: themeReducer,
  app: appReducer,
  bookmark: bookmarkReducer
})

export default rootReducer;