import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Theme } from '../../interfaces/Theme';

interface ThemeState {
  themes: Theme[];
}

const initialState: ThemeState = {
  themes: [],
};

export const themeReducer = (
  state: ThemeState = initialState,
  action: Action
): ThemeState => {
  switch (action.type) {
    case ActionType.fetchThemes: {
      return { themes: action.payload };
    }

    default:
      return state;
  }
};
