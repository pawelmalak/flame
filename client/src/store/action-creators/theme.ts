import { Dispatch } from 'redux';
import { SetThemeAction } from '../actions/theme';
import { ActionType } from '../action-types';
import { Theme } from '../../interfaces/Theme';
import { themes } from '../../components/Settings/Themer/themes.json';

export const setTheme =
  (name: string) => (dispatch: Dispatch<SetThemeAction>) => {
    const theme = themes.find((theme) => theme.name === name);

    if (theme) {
      localStorage.setItem('theme', name);
      loadTheme(theme);

      dispatch({
        type: ActionType.setTheme,
        payload: theme,
      });
    }
  };

export const loadTheme = (theme: Theme): void => {
  for (const [key, value] of Object.entries(theme.colors)) {
    document.body.style.setProperty(`--color-${key}`, value);
  }
};
