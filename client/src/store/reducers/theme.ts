import { ActionTypes, Action } from '../actions';
import { Theme } from '../../interfaces/Theme';

export interface State {
  theme: Theme;
}

const initialState: State = {
  theme: {
    name: 'tron',
    colors: {
      background: '#242B33',
      primary: '#EFFBFF',
      accent: '#6EE2FF',
    },
  },
};

const themeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.setTheme:
      return { theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
