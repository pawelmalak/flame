import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { App, AppResponse } from '../../interfaces/App';

export interface GetAppsAction<T> {
  type: ActionTypes.getApps | ActionTypes.getAppsSuccess | ActionTypes.getAppsError,
  payload: T
}

export const getApps = () => async (dispatch: Dispatch) => {
  dispatch<GetAppsAction<undefined>>({
    type: ActionTypes.getApps,
    payload: undefined
  });

  try {
    const res = await axios.get<AppResponse>('/api/apps');

    dispatch<GetAppsAction<App[]>>({
      type: ActionTypes.getAppsSuccess,
      payload: res.data.data
    })
  } catch (err) {
    dispatch<GetAppsAction<string>>({
      type: ActionTypes.getAppsError,
      payload: err.data.data
    })
  }
}