import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Theme } from '../../interfaces/Theme';
import { arrayPartition, parsePABToTheme } from '../../utility';

interface ThemeState {
  activeTheme: Theme;
  themes: Theme[];
  userThemes: Theme[];
  themeInEdit: Theme | null;
}

const savedTheme = localStorage.theme
  ? parsePABToTheme(localStorage.theme)
  : parsePABToTheme('#effbff;#6ee2ff;#242b33');

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
  themeInEdit: null,
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

    case ActionType.addTheme: {
      return {
        ...state,
        userThemes: [...state.userThemes, action.payload],
      };
    }

    case ActionType.deleteTheme: {
      return {
        ...state,
        userThemes: action.payload,
      };
    }

    case ActionType.editTheme: {
      return {
        ...state,
        themeInEdit: action.payload,
      };
    }

    case ActionType.updateTheme: {
      return {
        ...state,
        userThemes: action.payload,
      };
    }

    default:
      return state;
  }
};
