import { ActionTypes, Action } from '../actions';
import { Notification } from '../../interfaces';

export interface State {
  notifications: Notification[];
  idCounter: number;
}

const initialState: State = {
  notifications: [],
  idCounter: 0
}

const createNotification = (state: State, action: Action): State => {
  const tmpNotifications = [...state.notifications, {
    ...action.payload,
    id: state.idCounter
  }];

  return {
    ...state,
    notifications: tmpNotifications,
    idCounter: state.idCounter + 1
  }
}

const clearNotification = (state: State, action: Action): State => {
  const tmpNotifications = [...state.notifications]
    .filter((notification: Notification) => notification.id !== action.payload);

  return {
    ...state,
    notifications: tmpNotifications
  }
}

const notificationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.createNotification: return createNotification(state, action);
    case ActionTypes.clearNotification: return clearNotification(state, action);
    default: return state;
  }
}

export default notificationReducer;