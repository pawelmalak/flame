import { ActionType } from '../action-types';
import { Action } from '../actions/index';
import { App } from '../../interfaces';
import { sortData } from '../../utility';

interface AppsState {
  loading: boolean;
  apps: App[];
  errors: string | undefined;
}

const initialState: AppsState = {
  loading: true,
  apps: [],
  errors: undefined,
};

export const appsReducer = (
  state: AppsState = initialState,
  action: Action
): AppsState => {
  switch (action.type) {
    case ActionType.getApps:
      return {
        ...state,
        loading: true,
        errors: undefined,
      };

    case ActionType.getAppsSuccess:
      return {
        ...state,
        loading: false,
        apps: action.payload || [],
      };

    case ActionType.pinApp:
      const pinnedAppIdx = state.apps.findIndex(
        (app) => app.id === action.payload.id
      );

      return {
        ...state,
        apps: [
          ...state.apps.slice(0, pinnedAppIdx),
          action.payload,
          ...state.apps.slice(pinnedAppIdx + 1),
        ],
      };

    case ActionType.addAppSuccess:
      return {
        ...state,
        apps: [...state.apps, action.payload],
      };

    case ActionType.deleteApp:
      return {
        ...state,
        apps: [...state.apps].filter((app) => app.id !== action.payload),
      };

    case ActionType.updateApp:
      const updatedAppIdx = state.apps.findIndex(
        (app) => app.id === action.payload.id
      );

      return {
        ...state,
        apps: [
          ...state.apps.slice(0, updatedAppIdx),
          action.payload,
          ...state.apps.slice(updatedAppIdx + 1),
        ],
      };

    case ActionType.reorderApps:
      return {
        ...state,
        apps: action.payload,
      };

    case ActionType.sortApps:
      return {
        ...state,
        apps: sortData<App>(state.apps, action.payload),
      };

    default:
      return state;
  }
};
