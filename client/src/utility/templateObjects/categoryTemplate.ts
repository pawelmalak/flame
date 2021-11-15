import { Category, NewCategory } from '../../interfaces';

export const newCategoryTemplate: NewCategory = {
  name: '',
  isPublic: true,
};

export const categoryTemplate: Category = {
  ...newCategoryTemplate,
  id: -1,
  isPinned: false,
  orderId: 0,
  bookmarks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
