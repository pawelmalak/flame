import { Dispatch } from 'redux';
import { FetchThemesAction, SetThemeAction } from '../actions/theme';
import { ActionType } from '../action-types';
import { Theme, ApiResponse, ThemeColors } from '../../interfaces';
import { parseThemeToPAB } from '../../utility';
import axios from 'axios';

export const setTheme =
  (colors: ThemeColors, remeberTheme: boolean = true) =>
  (dispatch: Dispatch<SetThemeAction>) => {
    if (remeberTheme) {
      localStorage.setItem('theme', parseThemeToPAB(colors));
    }

    for (const [key, value] of Object.entries(colors)) {
      document.body.style.setProperty(`--color-${key}`, value);
    }
  };

export const fetchThemes =
  () => async (dispatch: Dispatch<FetchThemesAction>) => {
    try {
      const res = await axios.get<ApiResponse<Theme[]>>('/api/themes');

      dispatch({
        type: ActionType.fetchThemes,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
