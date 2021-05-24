import { Dispatch } from 'redux';
import { ActionTypes } from '.';
import { NewNotification } from '../../interfaces';

export interface CreateNotificationAction {
  type: ActionTypes.createNotification,
  payload: NewNotification
}

export const createNotification = (notification: NewNotification) => (dispatch: Dispatch) => {
  dispatch<CreateNotificationAction>({
    type: ActionTypes.createNotification,
    payload: notification
  })
}

export interface ClearNotificationAction {
  type: ActionTypes.clearNotification,
  payload: number
}

export const clearNotification = (id: number) => (dispatch: Dispatch) => {
  dispatch<ClearNotificationAction>({
    type: ActionTypes.clearNotification,
    payload: id
  })
}