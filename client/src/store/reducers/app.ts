import { ActionTypes, Action } from '../actions';
import { App } from '../../interfaces/App';
import { sortData } from '../../utility';

export interface State {
  loading: boolean;
  apps: App[];
  errors: string | undefined;
}

const initialState: State = {
  loading: true,
  apps: [],
  errors: undefined,
};

const getApps = (state: State, action: Action): State => {
  return {
    ...state,
    loading: true,
    errors: undefined,
  };
};

const getAppsSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    apps: action.payload,
  };
};

const getAppsError = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    errors: action.payload,
  };
};

const pinApp = (state: State, action: Action): State => {
  const tmpApps = [...state.apps];
  const changedApp = tmpApps.find((app: App) => app.id === action.payload.id);

  if (changedApp) {
    changedApp.isPinned = action.payload.isPinned;
  }

  return {
    ...state,
    apps: tmpApps,
  };
};

const addAppSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    apps: [...state.apps, action.payload],
  };
};

const deleteApp = (state: State, action: Action): State => {
  return {
    ...state,
    apps: [...state.apps].filter((app: App) => app.id !== action.payload),
  };
};

const updateApp = (state: State, action: Action): State => {
  const appIdx = state.apps.findIndex((app) => app.id === action.payload.id);

  return {
    ...state,
    apps: [
      ...state.apps.slice(0, appIdx),
      {
        ...action.payload,
      },
      ...state.apps.slice(appIdx + 1),
    ],
  };
};

const reorderApps = (state: State, action: Action): State => {
  return {
    ...state,
    apps: action.payload,
  };
};

const sortApps = (state: State, action: Action): State => {
  const sortedApps = sortData<App>(state.apps, action.payload);

  return {
    ...state,
    apps: sortedApps,
  };
};

const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getApps:
      return getApps(state, action);
    case ActionTypes.getAppsSuccess:
      return getAppsSuccess(state, action);
    case ActionTypes.getAppsError:
      return getAppsError(state, action);
    case ActionTypes.pinApp:
      return pinApp(state, action);
    case ActionTypes.addAppSuccess:
      return addAppSuccess(state, action);
    case ActionTypes.deleteApp:
      return deleteApp(state, action);
    case ActionTypes.updateApp:
      return updateApp(state, action);
    case ActionTypes.reorderApps:
      return reorderApps(state, action);
    case ActionTypes.sortApps:
      return sortApps(state, action);
    default:
      return state;
  }
};

export default appReducer;
