import { atom, useSetAtom } from 'jotai';
import { NewNotification, Notification } from '../interfaces';

export interface NotificationState {
  notifications: Notification[];
  idCounter: number;
}

export const notificationsAtom = atom<NotificationState>({
  notifications: [],
  idCounter: 0,
});

export const successMessage = (message: string): NewNotification => ({
  title: 'Success',
  message,
});

export const errorMessage = (message: string): NewNotification => ({
  title: 'Error',
  message,
});

export const infoMessage = (message: string): NewNotification => ({
  title: 'Info',
  message,
});

export const useCreateNotification = () => {
  const setNotifications = useSetAtom(notificationsAtom);

  return (newNotification: NewNotification) => {
    setNotifications(({ notifications, idCounter }) => ({
      notifications: [...notifications, { ...newNotification, id: idCounter }],
      idCounter: idCounter + 1,
    }));
  };
};

export const useClearNotification = () => {
  const setNotifications = useSetAtom(notificationsAtom);

  return (removeId: Notification['id']) => {
    setNotifications((prev) => ({
      ...prev,
      notifications: prev.notifications.filter(({ id }) => id !== removeId),
    }));
  };
};
