import { combineReducers } from 'redux';

import { GlobalState } from '../../interfaces/GlobalState';

import themeReducer from './theme';
import appReducer from './app';

const rootReducer = combineReducers<GlobalState>({
  theme: themeReducer,
  app: appReducer
})

export default rootReducer;