import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Config, ApiResponse, WeatherForm } from '../../interfaces';
import { CreateNotificationAction } from './notification';

export interface GetConfigAction {
  type: ActionTypes.getConfig;
  payload: Config[];
}

export const getConfig = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<ApiResponse<Config[]>>('/api/config');

    dispatch<GetConfigAction>({
      type: ActionTypes.getConfig,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err)
  }
}

export interface UpdateConfigAction {
  type: ActionTypes.updateConfig;
  payload: Config[];
}

export const updateConfig = (formData: WeatherForm) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<Config[]>>('/api/config', formData);
    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: 'Settings updated'
      }
    })

    dispatch<UpdateConfigAction>({
      type: ActionTypes.updateConfig,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}