import { ActionType } from '../action-types';

export interface LoginAction {
  type: ActionType.login;
  payload: string;
}

export interface LogoutAction {
  type: ActionType.logout;
}
