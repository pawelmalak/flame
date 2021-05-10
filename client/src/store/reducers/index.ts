import { combineReducers } from 'redux';

import themeReducer from './theme';
import appReducer from './app';

const rootReducer = combineReducers({
  theme: themeReducer,
  app: appReducer
})

export default rootReducer;