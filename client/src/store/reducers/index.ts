import { combineReducers } from 'redux';

import { themeReducer } from './theme';
import { configReducer } from './config';
import { notificationReducer } from './notification';

export const reducers = combineReducers({
  theme: themeReducer,
  config: configReducer,
  notification: notificationReducer,
});

export type State = ReturnType<typeof reducers>;
