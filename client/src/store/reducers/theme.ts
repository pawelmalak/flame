import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Theme } from '../../interfaces/Theme';
import { arrayPartition } from '../../utility';

interface ThemeState {
  themes: Theme[];
  userThemes: Theme[];
}

const initialState: ThemeState = {
  themes: [],
  userThemes: [],
};

export const themeReducer = (
  state: ThemeState = initialState,
  action: Action
): ThemeState => {
  switch (action.type) {
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
