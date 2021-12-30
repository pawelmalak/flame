import { App, NewApp } from '../../interfaces';

export const newAppTemplate: NewApp = {
  name: '',
  url: '',
  icon: '',
  isPublic: true,
  description: '',
};

export const appTemplate: App = {
  ...newAppTemplate,
  isPinned: false,
  orderId: 0,
  id: -1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
