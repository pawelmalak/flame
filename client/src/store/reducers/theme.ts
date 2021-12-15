import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Theme } from '../../interfaces/Theme';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: {
    name: 'tron',
    colors: {
      background: '#242B33',
      primary: '#EFFBFF',
      accent: '#6EE2FF',
    },
  },
};

export const themeReducer = (
  state: ThemeState = initialState,
  action: Action
): ThemeState => {
  switch (action.type) {
    case ActionType.setTheme:
      return { theme: action.payload };

    default:
      return state;
  }
};
