import { Dispatch } from 'redux';
import { NewNotification } from '../../interfaces';
import { ActionType } from '../action-types';
import {
  CreateNotificationAction,
  ClearNotificationAction,
} from '../actions/notification';

export const createNotification =
  (notification: NewNotification) =>
  (dispatch: Dispatch<CreateNotificationAction>) => {
    dispatch({
      type: ActionType.createNotification,
      payload: notification,
    });
  };

export const clearNotification =
  (id: number) => (dispatch: Dispatch<ClearNotificationAction>) => {
    dispatch({
      type: ActionType.clearNotification,
      payload: id,
    });
  };
