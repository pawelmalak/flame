import { ActionType } from '../action-types';
import { Theme, ThemeColors } from '../../interfaces';

export interface SetThemeAction {
  type: ActionType.setTheme;
  payload: ThemeColors;
}

export interface FetchThemesAction {
  type: ActionType.fetchThemes;
  payload: Theme[];
}

export interface AddThemeAction {
  type: ActionType.addTheme;
  payload: Theme;
}
