import { Action } from '../actions';
import { ActionType } from '../action-types';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.login:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };

    case ActionType.logout:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };

    case ActionType.autoLogin:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };

    case ActionType.authError:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
