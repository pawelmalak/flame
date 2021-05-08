import { Dispatch } from 'redux';
import { themes } from '../../components/Themer/themes.json';
import { Theme } from '../../interfaces/Theme';
import { SET_THEME } from './actionTypes';

export const setTheme = (themeName: string) => (dispatch: Dispatch) => {
  const theme = themes.find((theme: Theme) => theme.name === themeName);

  if (theme) {
    localStorage.setItem('theme', themeName);
    loadTheme(theme);

    dispatch({
      type: SET_THEME,
      payload: themeName
    })
  }
}

export const loadTheme = (theme: Theme) => {
  for (const [key, value] of Object.entries(theme.colors)) {
    document.body.style.setProperty(`--color-${key}`, value);
  }
}