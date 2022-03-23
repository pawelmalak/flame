import { ActionType } from '../action-types';
import { Theme } from '../../interfaces';

export interface SetThemeAction {
  type: ActionType.setTheme;
}

export interface FetchThemesAction {
  type: ActionType.fetchThemes;
  payload: Theme[];
}
