import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { ApiResponse, App, Config, NewApp } from '../../interfaces';
import {
  AddAppAction,
  DeleteAppAction,
  GetAppsAction,
  PinAppAction,
  ReorderAppsAction,
  SetEditAppAction,
  SortAppsAction,
  UpdateAppAction,
} from '../actions/app';
import axios from 'axios';
import { applyAuth } from '../../utility';

export const getApps =
  () => async (dispatch: Dispatch<GetAppsAction<undefined | App[]>>) => {
    dispatch({
      type: ActionType.getApps,
      payload: undefined,
    });

    try {
      const res = await axios.get<ApiResponse<App[]>>('/api/apps', {
        headers: applyAuth(),
      });

      dispatch({
        type: ActionType.getAppsSuccess,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const pinApp =
  (app: App) => async (dispatch: Dispatch<PinAppAction>) => {
    try {
      const { id, isPinned, name } = app;
      const res = await axios.put<ApiResponse<App>>(
        `/api/apps/${id}`,
        {
          isPinned: !isPinned,
        },
        {
          headers: applyAuth(),
        }
      );

      const status = isPinned
        ? 'unpinned from Homescreen'
        : 'pinned to Homescreen';

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `App ${name} ${status}`,
        },
      });

      dispatch({
        type: ActionType.pinApp,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addApp =
  (formData: NewApp | FormData) => async (dispatch: Dispatch<AddAppAction>) => {
    try {
      const res = await axios.post<ApiResponse<App>>('/api/apps', formData, {
        headers: applyAuth(),
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `App added`,
        },
      });

      await dispatch({
        type: ActionType.addAppSuccess,
        payload: res.data.data,
      });

      // Sort apps
      dispatch<any>(sortApps());
    } catch (err) {
      console.log(err);
    }
  };

export const deleteApp =
  (id: number) => async (dispatch: Dispatch<DeleteAppAction>) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/apps/${id}`, {
        headers: applyAuth(),
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'App deleted',
        },
      });

      dispatch({
        type: ActionType.deleteApp,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateApp =
  (id: number, formData: NewApp | FormData) =>
  async (dispatch: Dispatch<UpdateAppAction>) => {
    try {
      const res = await axios.put<ApiResponse<App>>(
        `/api/apps/${id}`,
        formData,
        {
          headers: applyAuth(),
        }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `App updated`,
        },
      });

      await dispatch({
        type: ActionType.updateApp,
        payload: res.data.data,
      });

      // Sort apps
      dispatch<any>(sortApps());
    } catch (err) {
      console.log(err);
    }
  };

export const reorderApps =
  (apps: App[]) => async (dispatch: Dispatch<ReorderAppsAction>) => {
    interface ReorderQuery {
      apps: {
        id: number;
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = { apps: [] };

      apps.forEach((app, index) =>
        updateQuery.apps.push({
          id: app.id,
          orderId: index + 1,
        })
      );

      await axios.put<ApiResponse<{}>>('/api/apps/0/reorder', updateQuery, {
        headers: applyAuth(),
      });

      dispatch({
        type: ActionType.reorderApps,
        payload: apps,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const sortApps = () => async (dispatch: Dispatch<SortAppsAction>) => {
  try {
    const res = await axios.get<ApiResponse<Config>>('/api/config');

    dispatch({
      type: ActionType.sortApps,
      payload: res.data.data.useOrdering,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setEditApp =
  (app: App | null) => (dispatch: Dispatch<SetEditAppAction>) => {
    dispatch({
      type: ActionType.setEditApp,
      payload: app,
    });
  };
