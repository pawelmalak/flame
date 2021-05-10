import {
  GET_APPS,
  GET_APPS_SUCCESS,
  GET_APPS_ERROR
} from '../actions/actionTypes';

import { App } from '../../interfaces/App';

interface State {
  loading: boolean;
  apps: App[];
}

const initialState: State = {
  loading: true,
  apps: []
}

const getApps = (state: State, action: any): State => {
  return {
    ...state,
    loading: true
  }
}

const getAppsSuccess = (state: State, action: any): State => {
  return {
    ...state,
    loading: false,
    apps: action.payload
  }
}

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_APPS: return getApps(state, action);
    case GET_APPS_SUCCESS: return getAppsSuccess(state, action);
    default: return state;
  }
}

export default appReducer;