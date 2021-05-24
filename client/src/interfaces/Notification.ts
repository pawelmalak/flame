export interface NewNotification {
  title: string;
  message: string;
}

export interface Notification extends NewNotification {
  id: number;
}