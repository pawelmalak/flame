export interface NewNotification {
  title: string;
  message: string;
  url?: string;
}

export interface Notification extends NewNotification {
  id: number;
}
