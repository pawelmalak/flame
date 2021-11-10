import { Dispatch } from 'redux';
import { ApiResponse } from '../../interfaces';
import { ActionType } from '../action-types';
import { LoginAction, LogoutAction } from '../actions/auth';
import axios, { AxiosError } from 'axios';

export const login =
  (password: string) => async (dispatch: Dispatch<LoginAction>) => {
    try {
      const res = await axios.post<ApiResponse<{ token: string }>>(
        '/api/auth',
        { password }
      );

      localStorage.setItem('token', res.data.data.token);

      dispatch({
        type: ActionType.login,
        payload: res.data.data.token,
      });
    } catch (err) {
      const apiError = err as AxiosError;

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Error',
          message: apiError.response?.data.error,
        },
      });
    }
  };

export const logout = () => (dispatch: Dispatch<LogoutAction>) => {
  localStorage.removeItem('token');

  dispatch({
    type: ActionType.logout,
  });
};
