import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Notification } from '../../interfaces';

export interface NotificationState {
  notifications: Notification[];
  idCounter: number;
}

const initialState: NotificationState = {
  notifications: [],
  idCounter: 0,
};

export const notificationReducer = (
  state: NotificationState = initialState,
  action: Action
): NotificationState => {
  switch (action.type) {
    case ActionType.createNotification:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: state.idCounter,
          },
        ],
        idCounter: state.idCounter + 1,
      };

    case ActionType.clearNotification:
      return {
        ...state,
        notifications: [...state.notifications].filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
