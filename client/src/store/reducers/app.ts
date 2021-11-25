import { ActionType } from '../action-types';
import { Action } from '../actions/index';
import { App } from '../../interfaces';
import { sortData } from '../../utility';

interface AppsState {
  loading: boolean;
  apps: App[];
  errors: string | undefined;
  appInUpdate: App | null;
}

const initialState: AppsState = {
  loading: true,
  apps: [],
  errors: undefined,
  appInUpdate: null,
};

export const appsReducer = (
  state: AppsState = initialState,
  action: Action
): AppsState => {
  switch (action.type) {
    case ActionType.getApps: {
      return {
        ...state,
        loading: true,
        errors: undefined,
      };
    }

    case ActionType.getAppsSuccess: {
      return {
        ...state,
        loading: false,
        apps: action.payload || [],
      };
    }

    case ActionType.pinApp: {
      const appIdx = state.apps.findIndex(
        (app) => app.id === action.payload.id
      );

      return {
        ...state,
        apps: [
          ...state.apps.slice(0, appIdx),
          action.payload,
          ...state.apps.slice(appIdx + 1),
        ],
      };
    }

    case ActionType.addAppSuccess: {
      return {
        ...state,
        apps: [...state.apps, action.payload],
      };
    }

    case ActionType.deleteApp: {
      return {
        ...state,
        apps: [...state.apps].filter((app) => app.id !== action.payload),
      };
    }

    case ActionType.updateApp: {
      const appIdx = state.apps.findIndex(
        (app) => app.id === action.payload.id
      );

      return {
        ...state,
        apps: [
          ...state.apps.slice(0, appIdx),
          action.payload,
          ...state.apps.slice(appIdx + 1),
        ],
      };
    }

    case ActionType.reorderApps: {
      return {
        ...state,
        apps: action.payload,
      };
    }

    case ActionType.sortApps: {
      return {
        ...state,
        apps: sortData<App>(state.apps, action.payload),
      };
    }

    case ActionType.setEditApp: {
      return {
        ...state,
        appInUpdate: action.payload,
      };
    }

    default:
      return state;
  }
};
