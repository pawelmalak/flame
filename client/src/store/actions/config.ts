import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Config, ApiResponse, Query } from '../../interfaces';
import { CreateNotificationAction } from './notification';
import { storeUIConfig } from '../../utility';

export interface GetConfigAction {
  type: ActionTypes.getConfig;
  payload: Config;
}

export const getConfig = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<ApiResponse<Config>>('/api/config');

    dispatch<GetConfigAction>({
      type: ActionTypes.getConfig,
      payload: res.data.data,
    });

    // Set custom page title if set
    document.title = res.data.data.customTitle;

    // Store settings for priority UI elements
    const keys: (keyof Config)[] = [
      'useAmericanDate',
      'greetingsSchema',
      'daySchema',
      'monthSchema',
    ];
    for (let key of keys) {
      storeUIConfig(key, res.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export interface UpdateConfigAction {
  type: ActionTypes.updateConfig;
  payload: Config;
}

export const updateConfig = (formData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<Config>>('/api/config', formData);

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

    // Store settings for priority UI elements
    const keys: (keyof Config)[] = [
      'useAmericanDate',
      'greetingsSchema',
      'daySchema',
      'monthSchema',
    ];
    for (let key of keys) {
      storeUIConfig(key, res.data.data);
    }
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
      const res = await axios.get<ApiResponse<Query[]>>('/api/queries');

      dispatch<FetchQueriesAction>({
        type: ActionTypes.fetchQueries,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface AddQueryAction {
  type: ActionTypes.addQuery;
  payload: Query;
}

export const addQuery =
  (query: Query) => async (dispatch: Dispatch<AddQueryAction>) => {
    try {
      const res = await axios.post<ApiResponse<Query>>('/api/queries', query);

      dispatch<AddQueryAction>({
        type: ActionTypes.addQuery,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface DeleteQueryAction {
  type: ActionTypes.deleteQuery;
  payload: Query[];
}

export const deleteQuery =
  (prefix: string) => async (dispatch: Dispatch<DeleteQueryAction>) => {
    try {
      const res = await axios.delete<ApiResponse<Query[]>>(
        `/api/queries/${prefix}`
      );

      dispatch<DeleteQueryAction>({
        type: ActionTypes.deleteQuery,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export interface UpdateQueryAction {
  type: ActionTypes.updateQuery;
  payload: Query[];
}

export const updateQuery =
  (query: Query, oldPrefix: string) =>
  async (dispatch: Dispatch<UpdateQueryAction>) => {
    try {
      const res = await axios.put<ApiResponse<Query[]>>(
        `/api/queries/${oldPrefix}`,
        query
      );

      dispatch<UpdateQueryAction>({
        type: ActionTypes.updateQuery,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
