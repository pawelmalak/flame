import axios, { AxiosError } from 'axios';
import { atom, useSetAtom } from 'jotai';
import { ApiResponse, Theme, ThemeColors } from '../interfaces';
import {
  applyAuth,
  arrayPartition,
  parsePABToTheme,
  parseThemeToPAB,
} from '../utility';
import {
  errorMessage,
  successMessage,
  useCreateNotification,
} from './notification';

const savedTheme = localStorage.theme
  ? parsePABToTheme(localStorage.theme)
  : parsePABToTheme('#effbff;#6ee2ff;#242b33');

export const activeThemeAtom = atom<Theme>({
  name: 'main',
  isCustom: false,
  colors: {
    ...savedTheme,
  },
});

export const themesAtom = atom<Theme[]>([]);
export const userThemesAtom = atom<Theme[]>([]);
export const themeInEditAtom = atom<Theme | null>(null);

export const useFetchThemes = () => {
  const setThemes = useSetAtom(themesAtom);
  const setUserThemes = useSetAtom(userThemesAtom);

  return async () => {
    try {
      const res = await axios.get<ApiResponse<Theme[]>>('/api/themes');
      const [themes, userThemes] = arrayPartition<Theme>(
        res.data.data,
        (e) => !e.isCustom
      );

      setThemes(themes);
      setUserThemes(userThemes);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useSetTheme = () => {
  const setTheme = useSetAtom(activeThemeAtom);

  return (colors: ThemeColors, remember: boolean = true) => {
    if (remember) {
      localStorage.setItem('theme', parseThemeToPAB(colors));
    }

    for (const [key, value] of Object.entries(colors)) {
      document.body.style.setProperty(`--color-${key}`, value);
    }

    setTheme((prev) => ({ ...prev, colors }));
  };
};

export const useAddTheme = () => {
  const setUserThemes = useSetAtom(userThemesAtom);
  const createNotification = useCreateNotification();

  return async (theme: Theme) => {
    try {
      const res = await axios.post<ApiResponse<Theme>>('/api/themes', theme, {
        headers: applyAuth(),
      });

      setUserThemes((prev) => [...prev, res.data.data]);
      createNotification(successMessage('Theme added'));
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      createNotification(
        errorMessage(error.response?.data.error ?? 'Unable to add theme')
      );
    }
  };
};

export const useUpdateTheme = () => {
  const setUserThemes = useSetAtom(userThemesAtom);

  return async (theme: Theme, originalName: string) => {
    try {
      const res = await axios.put<ApiResponse<Theme[]>>(
        `/api/themes/${originalName}`,
        theme,
        { headers: applyAuth() }
      );

      setUserThemes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useDeleteTheme = () => {
  const setUserThemes = useSetAtom(userThemesAtom);
  const createNotification = useCreateNotification();

  return async (name: string) => {
    try {
      const res = await axios.delete<ApiResponse<Theme[]>>(
        `/api/themes/${name}`,
        { headers: applyAuth() }
      );

      setUserThemes(res.data.data);
      createNotification(successMessage('Theme deleted'));
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      createNotification(
        errorMessage(error.response?.data.error ?? 'Unable to delete theme')
      );
    }
  };
};
