import { ActionTypes, Action } from '../actions';

export interface State {
  theme: string;
}

const initialState: State = {
  theme: 'blues'
}

const setTheme = (state: State, action: Action): State => {
  return { theme: action.payload };
}

const themeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.setTheme: return setTheme(state, action);
    default: return state;
  }
}

export default themeReducer;