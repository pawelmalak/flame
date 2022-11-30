import axios, { AxiosError } from 'axios';
import { atom, useSetAtom } from 'jotai';
import { ApiResponse } from '../interfaces';
import { useFetchApps } from './app';
import { useFetchCategories } from './bookmark';
import { errorMessage, useCreateNotification } from './notification';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const loggedOutState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const authAtom = atom<AuthState>(loggedOutState);

export const useLogin = () => {
  const setAuth = useSetAtom(authAtom);
  const fetchApps = useFetchApps();
  const fetchCategories = useFetchCategories();
  const authError = useAuthError();

  return async (formData: { password: string; duration: string }) => {
    try {
      const res = await axios.post<ApiResponse<{ token: string }>>(
        '/api/auth',
        formData
      );
      const token = res.data.data.token;

      localStorage.setItem('token', token);
      setAuth({ token, isAuthenticated: true });

      fetchApps();
      fetchCategories();
    } catch (err) {
      authError(err, true);
    }
  };
};

export const useLogout = () => {
  const setAuth = useSetAtom(authAtom);
  const fetchApps = useFetchApps();
  const fetchCategories = useFetchCategories();

  return () => {
    localStorage.removeItem('token');
    setAuth(loggedOutState);

    fetchApps();
    fetchCategories();
  };
};

export const useAutoLogin = () => {
  const setAuth = useSetAtom(authAtom);
  const fetchApps = useFetchApps();
  const fetchCategories = useFetchCategories();
  const authError = useAuthError();

  return async () => {
    const token: string = localStorage.token;

    try {
      await axios.post<ApiResponse<{ token: { isValid: boolean } }>>(
        '/api/auth/validate',
        { token }
      );

      setAuth({ token, isAuthenticated: true });

      fetchApps();
      fetchCategories();
    } catch (err) {
      authError(err);
    }
  };
};

export const useAuthError = () => {
  const createNotification = useCreateNotification();
  const fetchApps = useFetchApps();

  return (error: unknown, showNotification: boolean = false) => {
    const apiError = error as AxiosError;

    if (showNotification) {
      createNotification(
        errorMessage(apiError.response?.data.error ?? 'Authenticaton error')
      );
    }

    fetchApps();
  };
};
