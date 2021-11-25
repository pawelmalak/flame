import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Config, Query } from '../../interfaces';
import { configTemplate } from '../../utility';

interface ConfigState {
  loading: boolean;
  config: Config;
  customQueries: Query[];
}

const initialState: ConfigState = {
  loading: true,
  config: { ...configTemplate },
  customQueries: [],
};

export const configReducer = (
  state: ConfigState = initialState,
  action: Action
): ConfigState => {
  switch (action.type) {
    case ActionType.getConfig:
      return {
        ...state,
        loading: false,
        config: action.payload,
      };

    case ActionType.updateConfig:
      return {
        ...state,
        config: action.payload,
      };

    case ActionType.fetchQueries:
      return {
        ...state,
        customQueries: action.payload,
      };

    case ActionType.addQuery:
      return {
        ...state,
        customQueries: [...state.customQueries, action.payload],
      };

    case ActionType.deleteQuery:
      return {
        ...state,
        customQueries: action.payload,
      };

    case ActionType.updateQuery:
      return {
        ...state,
        customQueries: action.payload,
      };

    default:
      return state;
  }
};
