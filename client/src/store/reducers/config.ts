import { ActionTypes, Action } from '../actions';
import { Config } from '../../interfaces';

export interface State {
  loading: boolean;
  config: Config[];
}

const initialState: State = {
  loading: true,
  config: []
}

const getConfig = (state: State, action: Action): State => {
  return {
    loading: false,
    config: action.payload
  }
}

const updateConfig = (state: State, action: Action): State => {
  return {
    ...state,
    config: action.payload
  }
}

const configReducer = (state: State = initialState, action: Action) => {
  switch(action.type) {
    case ActionTypes.getConfig: return getConfig(state, action);
    case ActionTypes.updateConfig: return updateConfig(state, action);
    default: return state;
  }
}

export default configReducer;