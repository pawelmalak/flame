import { Dispatch } from 'redux';
import {
  AddQueryAction,
  DeleteQueryAction,
  FetchQueriesAction,
  GetConfigAction,
  UpdateConfigAction,
  UpdateQueryAction,
} from '../actions/config';
import axios from 'axios';
import {
  ApiResponse,
  Config,
  OtherSettingsForm,
  Query,
  SearchForm,
  WeatherForm,
} from '../../interfaces';
import { ActionType } from '../action-types';
import { storeUIConfig } from '../../utility';

export const getConfig = () => async (dispatch: Dispatch<GetConfigAction>) => {
  try {
    const res = await axios.get<ApiResponse<Config>>('/api/config');

    dispatch({
      type: ActionType.getConfig,
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

export const updateConfig =
  (formData: WeatherForm | OtherSettingsForm | SearchForm) =>
  async (dispatch: Dispatch<UpdateConfigAction>) => {
    try {
      const res = await axios.put<ApiResponse<Config>>('/api/config', formData);

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'Settings updated',
        },
      });

      dispatch({
        type: ActionType.updateConfig,
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

export const fetchQueries =
  () => async (dispatch: Dispatch<FetchQueriesAction>) => {
    try {
      const res = await axios.get<ApiResponse<Query[]>>('/api/queries');

      dispatch({
        type: ActionType.fetchQueries,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addQuery =
  (query: Query) => async (dispatch: Dispatch<AddQueryAction>) => {
    try {
      const res = await axios.post<ApiResponse<Query>>('/api/queries', query);

      dispatch({
        type: ActionType.addQuery,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteQuery =
  (prefix: string) => async (dispatch: Dispatch<DeleteQueryAction>) => {
    try {
      const res = await axios.delete<ApiResponse<Query[]>>(
        `/api/queries/${prefix}`
      );

      dispatch({
        type: ActionType.deleteQuery,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateQuery =
  (query: Query, oldPrefix: string) =>
  async (dispatch: Dispatch<UpdateQueryAction>) => {
    try {
      const res = await axios.put<ApiResponse<Query[]>>(
        `/api/queries/${oldPrefix}`,
        query
      );

      dispatch({
        type: ActionType.updateQuery,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
