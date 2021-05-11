import { Dispatch } from 'redux';
import { themes } from '../../components/Themer/themes.json';
import { Theme } from '../../interfaces/Theme';
import { ActionTypes } from './actionTypes';

export interface SetTheme {
  type: ActionTypes.setTheme,
  payload: string
}

export const setTheme = (themeName: string) => (dispatch: Dispatch) => {
  const theme = themes.find((theme: Theme) => theme.name === themeName);

  if (theme) {
    localStorage.setItem('theme', themeName);
    loadTheme(theme);

    dispatch<SetTheme>({
      type: ActionTypes.setTheme,
      payload: themeName
    })
  }
}

export const loadTheme = (theme: Theme) => {
  for (const [key, value] of Object.entries(theme.colors)) {
    document.body.style.setProperty(`--color-${key}`, value);
  }
}