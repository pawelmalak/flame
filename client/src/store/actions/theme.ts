import { Dispatch } from 'redux';
import { themes } from '../../components/Themer/themes.json';
import { Theme } from '../../interfaces/Theme';
import { ActionTypes } from './actionTypes';

export interface SetThemeAction {
  type: ActionTypes.setTheme,
  payload: Theme
}

export const setTheme = (themeName: string) => (dispatch: Dispatch) => {
  const theme = themes.find((theme: Theme) => theme.name === themeName);

  if (theme) {
    localStorage.setItem('theme', themeName);
    loadTheme(theme);

    dispatch<SetThemeAction>({
      type: ActionTypes.setTheme,
      payload: theme
    })
  }
}

export const loadTheme = (theme: Theme): void => {
  for (const [key, value] of Object.entries(theme.colors)) {
    document.body.style.setProperty(`--color-${key}`, value);
  }
}