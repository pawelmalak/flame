import { ActionTypes, Action } from '../actions';
import { Config, Query } from '../../interfaces';

export interface State {
  loading: boolean;
  config: Config[];
  customQueries: Query[];
}

const initialState: State = {
  loading: true,
  config: [],
  customQueries: [],
};

const getConfig = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
  };
};

const updateConfig = (state: State, action: Action): State => {
  return {
    ...state,
    config: action.payload,
  };
};

const fetchQueries = (state: State, action: Action): State => {
  return {
    ...state,
    customQueries: action.payload,
  };
};

const addQuery = (state: State, action: Action): State => {
  return {
    ...state,
    customQueries: [...state.customQueries, action.payload],
  };
};

const deleteQuery = (state: State, action: Action): State => {
  return {
    ...state,
    customQueries: action.payload,
  };
};

const configReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getConfig:
      return getConfig(state, action);
    case ActionTypes.updateConfig:
      return updateConfig(state, action);
    case ActionTypes.fetchQueries:
      return fetchQueries(state, action);
    case ActionTypes.addQuery:
      return addQuery(state, action);
    case ActionTypes.deleteQuery:
      return deleteQuery(state, action);
    default:
      return state;
  }
};

export default configReducer;
