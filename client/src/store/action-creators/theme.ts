import { Dispatch } from 'redux';
import {
  AddThemeAction,
  FetchThemesAction,
  SetThemeAction,
} from '../actions/theme';
import { ActionType } from '../action-types';
import { Theme, ApiResponse, ThemeColors } from '../../interfaces';
import { applyAuth, parseThemeToPAB } from '../../utility';
import axios, { AxiosError } from 'axios';

export const setTheme =
  (colors: ThemeColors, remeberTheme: boolean = true) =>
  (dispatch: Dispatch<SetThemeAction>) => {
    if (remeberTheme) {
      localStorage.setItem('theme', parseThemeToPAB(colors));
    }

    for (const [key, value] of Object.entries(colors)) {
      document.body.style.setProperty(`--color-${key}`, value);
    }

    dispatch({
      type: ActionType.setTheme,
      payload: colors,
    });
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

export const addTheme =
  (theme: Theme) => async (dispatch: Dispatch<AddThemeAction>) => {
    try {
      const res = await axios.post<ApiResponse<Theme>>('/api/themes', theme, {
        headers: applyAuth(),
      });

      dispatch({
        type: ActionType.addTheme,
        payload: res.data.data,
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'Theme added',
        },
      });
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Error',
          message: error.response?.data.error,
        },
      });
    }
  };
