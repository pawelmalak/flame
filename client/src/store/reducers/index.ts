import { combineReducers } from 'redux';

import themeReducer from './theme';

const rootReducer = combineReducers({
  theme: themeReducer
})

export default rootReducer;