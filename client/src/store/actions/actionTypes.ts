import {
  GetAppsAction,
  SetTheme
} from './';

export enum ActionTypes {
  setTheme,
  getApps,
  getAppsSuccess,
  getAppsError
}

export type Action = GetAppsAction<any> | SetTheme;