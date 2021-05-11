import { ActionTypes, Action } from '../actions';
import { App } from '../../interfaces/App';

export interface State {
  loading: boolean;
  apps: App[];
  errors: '' | undefined;
}

const initialState: State = {
  loading: true,
  apps: [],
  errors: undefined
}

const getApps = (state: State, action: Action): State => {
  return {
    ...state,
    loading: true,
    errors: undefined
  }
}

const getAppsSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    apps: action.payload
  }
}

const getAppsError = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    errors: action.payload
  }
}

const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getApps: return getApps(state, action);
    case ActionTypes.getAppsSuccess: return getAppsSuccess(state, action);
    case ActionTypes.getAppsError: return getAppsError(state, action);
    default: return state;
  }
}

export default appReducer;