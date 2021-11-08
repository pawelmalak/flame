import { App, NewApp } from '../../interfaces';

export const newAppTemplate: NewApp = {
  name: '',
  url: '',
  icon: '',
  isPublic: true,
};

export const appTemplate: App = {
  ...newAppTemplate,
  isPinned: false,
  orderId: 0,
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
