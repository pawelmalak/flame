import { ActionType } from '../action-types';

export interface LoginAction {
  type: ActionType.login;
  payload: string;
}

export interface LogoutAction {
  type: ActionType.logout;
}

export interface AutoLoginAction {
  type: ActionType.autoLogin;
  payload: string;
}

export interface AuthErrorAction {
  type: ActionType.authError;
}
