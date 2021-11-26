import { Bookmark, Category } from '../../interfaces';
import { ActionType } from '../action-types';

export interface GetCategoriesAction<T> {
  type:
    | ActionType.getCategories
    | ActionType.getCategoriesSuccess
    | ActionType.getCategoriesError;
  payload: T;
}

export interface AddCategoryAction {
  type: ActionType.addCategory;
  payload: Category;
}

export interface AddBookmarkAction {
  type: ActionType.addBookmark;
  payload: Bookmark;
}

export interface PinCategoryAction {
  type: ActionType.pinCategory;
  payload: Category;
}

export interface DeleteCategoryAction {
  type: ActionType.deleteCategory;
  payload: number;
}

export interface UpdateCategoryAction {
  type: ActionType.updateCategory;
  payload: Category;
}

export interface DeleteBookmarkAction {
  type: ActionType.deleteBookmark;
  payload: {
    bookmarkId: number;
    categoryId: number;
  };
}

export interface UpdateBookmarkAction {
  type: ActionType.updateBookmark;
  payload: Bookmark;
}

export interface SortCategoriesAction {
  type: ActionType.sortCategories;
  payload: string;
}

export interface ReorderCategoriesAction {
  type: ActionType.reorderCategories;
  payload: Category[];
}

export interface SetEditCategoryAction {
  type: ActionType.setEditCategory;
  payload: Category | null;
}

export interface SetEditBookmarkAction {
  type: ActionType.setEditBookmark;
  payload: Bookmark | null;
}

export interface ReorderBookmarksAction {
  type: ActionType.reorderBookmarks;
  payload: {
    bookmarks: Bookmark[];
    categoryId: number;
  };
}

export interface SortBookmarksAction {
  type: ActionType.sortBookmarks;
  payload: {
    orderType: string;
    categoryId: number;
  };
}
