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

export interface DeleteThemeAction {
  type: ActionType.deleteTheme;
  payload: Theme[];
}

export interface UpdateThemeAction {
  type: ActionType.updateTheme;
  payload: Theme[];
}

export interface EditThemeAction {
  type: ActionType.editTheme;
  payload: Theme | null;
}
