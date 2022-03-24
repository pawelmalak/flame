import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Theme, ThemeColors } from '../../interfaces/Theme';
import { arrayPartition, parsePABToTheme } from '../../utility';

interface ThemeState {
  activeTheme: Theme;
  themes: Theme[];
  userThemes: Theme[];
}

const savedTheme: ThemeColors = parsePABToTheme(localStorage.theme) || {
  primary: '#effbff',
  accent: '#6ee2ff',
  background: '#242b33',
};

const initialState: ThemeState = {
  activeTheme: {
    name: 'main',
    isCustom: false,
    colors: {
      ...savedTheme,
    },
  },
  themes: [],
  userThemes: [],
};

export const themeReducer = (
  state: ThemeState = initialState,
  action: Action
): ThemeState => {
  switch (action.type) {
    case ActionType.setTheme: {
      return {
        ...state,
        activeTheme: {
          ...state.activeTheme,
          colors: action.payload,
        },
      };
    }

    case ActionType.fetchThemes: {
      const [themes, userThemes] = arrayPartition<Theme>(
        action.payload,
        (e) => !e.isCustom
      );

      return {
        ...state,
        themes,
        userThemes,
      };
    }

    default:
      return state;
  }
};
