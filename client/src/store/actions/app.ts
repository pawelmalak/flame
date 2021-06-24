import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { App, ApiResponse, NewApp, Config } from '../../interfaces';
import { CreateNotificationAction } from './notification';

export interface GetAppsAction<T> {
  type: ActionTypes.getApps | ActionTypes.getAppsSuccess | ActionTypes.getAppsError;
  payload: T;
}

export const getApps = () => async (dispatch: Dispatch) => {
  dispatch<GetAppsAction<undefined>>({
    type: ActionTypes.getApps,
    payload: undefined
  });

  try {
    const res = await axios.get<ApiResponse<App[]>>('/api/apps');

    dispatch<GetAppsAction<App[]>>({
      type: ActionTypes.getAppsSuccess,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

export interface PinAppAction {
  type: ActionTypes.pinApp;
  payload: App;
}

export const pinApp = (app: App) => async (dispatch: Dispatch) => {
  try {
    const { id, isPinned, name } = app;
    const res = await axios.put<ApiResponse<App>>(`/api/apps/${id}`, { isPinned: !isPinned });

    const status = isPinned ? 'unpinned from Homescreen' : 'pinned to Homescreen';

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `App ${name} ${status}`
      }
    })

    dispatch<PinAppAction>({
      type: ActionTypes.pinApp,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

export interface AddAppAction {
  type: ActionTypes.addAppSuccess;
  payload: App;
}

export const addApp = (formData: NewApp | FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<App>>('/api/apps', formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `App added`
      }
    })

    await dispatch<AddAppAction>({
      type: ActionTypes.addAppSuccess,
      payload: res.data.data
    })

    // Sort apps
    dispatch<any>(sortApps())
  } catch (err) {
    console.log(err);
  }
}

export interface DeleteAppAction {
  type: ActionTypes.deleteApp,
  payload: number
}

export const deleteApp = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete<ApiResponse<{}>>(`/api/apps/${id}`);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: 'App deleted'
      }
    })

    dispatch<DeleteAppAction>({
      type: ActionTypes.deleteApp,
      payload: id
    })
  } catch (err) {
    console.log(err);
  }
}

export interface UpdateAppAction {
  type: ActionTypes.updateApp;
  payload: App;
}

export const updateApp = (id: number, formData: NewApp | FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<App>>(`/api/apps/${id}`, formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `App updated`
      }
    })

    await dispatch<UpdateAppAction>({
      type: ActionTypes.updateApp,
      payload: res.data.data
    })

    // Sort apps
    dispatch<any>(sortApps())
  } catch (err) {
    console.log(err);
  }
}

export interface ReorderAppsAction {
  type: ActionTypes.reorderApps;
  payload: App[]
}

interface ReorderQuery {
  apps: {
    id: number;
    orderId: number;
  }[]
}

export const reorderApps = (apps: App[]) => async (dispatch: Dispatch) => {
  try {
    const updateQuery: ReorderQuery = { apps: [] }

    apps.forEach((app, index) => updateQuery.apps.push({
      id: app.id,
      orderId: index + 1
    }))

    await axios.put<ApiResponse<{}>>('/api/apps/0/reorder', updateQuery);

    dispatch<ReorderAppsAction>({
      type: ActionTypes.reorderApps,
      payload: apps
    })
  } catch (err) {
    console.log(err);
  }
}

export interface SortAppsAction {
  type: ActionTypes.sortApps;
  payload: string;
}

export const sortApps = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<ApiResponse<Config>>('/api/config/useOrdering');

    dispatch<SortAppsAction>({
      type: ActionTypes.sortApps,
      payload: res.data.data.value
    })
  } catch (err) {
    console.log(err);
  }
}