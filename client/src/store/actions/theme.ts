import { ActionType } from '../action-types';
import { Theme } from '../../interfaces';

export interface SetThemeAction {
  type: ActionType.setTheme;
  payload: Theme;
}
