import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Config, ApiResponse, Query } from '../../interfaces';
import { CreateNotificationAction } from './notification';
import { searchConfig } from '../../utility';

export interface GetConfigAction {
  type: ActionTypes.getConfig;
  payload: Config[];
}

export const getConfig = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<ApiResponse<Config[]>>('/api/config');

    dispatch<GetConfigAction>({
      type: ActionTypes.getConfig,
      payload: res.data.data,
    });

    // Set custom page title if set
    document.title = searchConfig('customTitle', 'Flame');
  } catch (err) {
    console.log(err);
  }
};

export interface UpdateConfigAction {
  type: ActionTypes.updateConfig;
  payload: Config[];
}

export const updateConfig = (formData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<Config[]>>('/api/config', formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: 'Settings updated',
      },
    });

    dispatch<UpdateConfigAction>({
      type: ActionTypes.updateConfig,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export interface FetchQueriesAction {
  type: ActionTypes.fetchQueries;
  payload: Query[];
}

export const fetchQueries =
  () => async (dispatch: Dispatch<FetchQueriesAction>) => {
    try {
      const res = await axios.get<ApiResponse<Query[]>>(
        '/api/config/0/queries'
      );

      dispatch<FetchQueriesAction>({
        type: ActionTypes.fetchQueries,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
