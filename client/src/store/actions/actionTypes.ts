import {
  GetAppsAction,
  SetTheme,
  PinAppAction,
  AddAppAction
} from './';

export enum ActionTypes {
  setTheme = 'SET_THEME',
  getApps = 'GET_APPS',
  getAppsSuccess = 'GET_APPS_SUCCESS',
  getAppsError = 'GET_APPS_ERROR',
  pinApp = 'PIN_APP',
  addApp = 'ADD_APP',
  addAppSuccess = 'ADD_APP_SUCCESS'
}

export type Action = GetAppsAction<any> | SetTheme | PinAppAction | AddAppAction;