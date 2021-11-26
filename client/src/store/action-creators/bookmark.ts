import axios from 'axios';
import { Dispatch } from 'redux';
import { applyAuth } from '../../utility';
import { ActionType } from '../action-types';

import {
  ApiResponse,
  Bookmark,
  Category,
  Config,
  NewBookmark,
  NewCategory,
} from '../../interfaces';

import {
  AddBookmarkAction,
  AddCategoryAction,
  DeleteBookmarkAction,
  DeleteCategoryAction,
  GetCategoriesAction,
  PinCategoryAction,
  ReorderBookmarksAction,
  ReorderCategoriesAction,
  SetEditBookmarkAction,
  SetEditCategoryAction,
  SortBookmarksAction,
  SortCategoriesAction,
  UpdateBookmarkAction,
  UpdateCategoryAction,
} from '../actions/bookmark';

export const getCategories =
  () =>
  async (dispatch: Dispatch<GetCategoriesAction<undefined | Category[]>>) => {
    dispatch({
      type: ActionType.getCategories,
      payload: undefined,
    });

    try {
      const res = await axios.get<ApiResponse<Category[]>>('/api/categories', {
        headers: applyAuth(),
      });

      dispatch({
        type: ActionType.getCategoriesSuccess,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addCategory =
  (formData: NewCategory) => async (dispatch: Dispatch<AddCategoryAction>) => {
    try {
      const res = await axios.post<ApiResponse<Category>>(
        '/api/categories',
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${formData.name} created`,
        },
      });

      dispatch({
        type: ActionType.addCategory,
        payload: res.data.data,
      });

      dispatch<any>(sortCategories());
    } catch (err) {
      console.log(err);
    }
  };

export const addBookmark =
  (formData: NewBookmark | FormData) =>
  async (dispatch: Dispatch<AddBookmarkAction>) => {
    try {
      const res = await axios.post<ApiResponse<Bookmark>>(
        '/api/bookmarks',
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Bookmark created`,
        },
      });

      dispatch({
        type: ActionType.addBookmark,
        payload: res.data.data,
      });

      dispatch<any>(sortBookmarks(res.data.data.categoryId));
    } catch (err) {
      console.log(err);
    }
  };

export const pinCategory =
  (category: Category) => async (dispatch: Dispatch<PinCategoryAction>) => {
    try {
      const { id, isPinned, name } = category;
      const res = await axios.put<ApiResponse<Category>>(
        `/api/categories/${id}`,
        { isPinned: !isPinned },
        { headers: applyAuth() }
      );

      const status = isPinned
        ? 'unpinned from Homescreen'
        : 'pinned to Homescreen';

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${name} ${status}`,
        },
      });

      dispatch({
        type: ActionType.pinCategory,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteCategory =
  (id: number) => async (dispatch: Dispatch<DeleteCategoryAction>) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/categories/${id}`, {
        headers: applyAuth(),
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category deleted`,
        },
      });

      dispatch({
        type: ActionType.deleteCategory,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateCategory =
  (id: number, formData: NewCategory) =>
  async (dispatch: Dispatch<UpdateCategoryAction>) => {
    try {
      const res = await axios.put<ApiResponse<Category>>(
        `/api/categories/${id}`,
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Category ${formData.name} updated`,
        },
      });

      dispatch({
        type: ActionType.updateCategory,
        payload: res.data.data,
      });

      dispatch<any>(sortCategories());
    } catch (err) {
      console.log(err);
    }
  };

export const deleteBookmark =
  (bookmarkId: number, categoryId: number) =>
  async (dispatch: Dispatch<DeleteBookmarkAction>) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/bookmarks/${bookmarkId}`, {
        headers: applyAuth(),
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'Bookmark deleted',
        },
      });

      dispatch({
        type: ActionType.deleteBookmark,
        payload: {
          bookmarkId,
          categoryId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateBookmark =
  (
    bookmarkId: number,
    formData: NewBookmark | FormData,
    category: {
      prev: number;
      curr: number;
    }
  ) =>
  async (
    dispatch: Dispatch<
      DeleteBookmarkAction | AddBookmarkAction | UpdateBookmarkAction
    >
  ) => {
    try {
      const res = await axios.put<ApiResponse<Bookmark>>(
        `/api/bookmarks/${bookmarkId}`,
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Bookmark updated`,
        },
      });

      // Check if category was changed
      const categoryWasChanged = category.curr !== category.prev;

      if (categoryWasChanged) {
        // Delete bookmark from old category
        dispatch({
          type: ActionType.deleteBookmark,
          payload: {
            bookmarkId,
            categoryId: category.prev,
          },
        });

        // Add bookmark to the new category
        dispatch({
          type: ActionType.addBookmark,
          payload: res.data.data,
        });
      } else {
        // Else update only name/url/icon
        dispatch({
          type: ActionType.updateBookmark,
          payload: res.data.data,
        });
      }

      dispatch<any>(sortBookmarks(res.data.data.categoryId));
    } catch (err) {
      console.log(err);
    }
  };

export const sortCategories =
  () => async (dispatch: Dispatch<SortCategoriesAction>) => {
    try {
      const res = await axios.get<ApiResponse<Config>>('/api/config');

      dispatch({
        type: ActionType.sortCategories,
        payload: res.data.data.useOrdering,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const reorderCategories =
  (categories: Category[]) =>
  async (dispatch: Dispatch<ReorderCategoriesAction>) => {
    interface ReorderQuery {
      categories: {
        id: number;
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = { categories: [] };

      categories.forEach((category, index) =>
        updateQuery.categories.push({
          id: category.id,
          orderId: index + 1,
        })
      );

      await axios.put<ApiResponse<{}>>(
        '/api/categories/0/reorder',
        updateQuery,
        { headers: applyAuth() }
      );

      dispatch({
        type: ActionType.reorderCategories,
        payload: categories,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const setEditCategory =
  (category: Category | null) =>
  (dispatch: Dispatch<SetEditCategoryAction>) => {
    dispatch({
      type: ActionType.setEditCategory,
      payload: category,
    });
  };

export const setEditBookmark =
  (bookmark: Bookmark | null) =>
  (dispatch: Dispatch<SetEditBookmarkAction>) => {
    dispatch({
      type: ActionType.setEditBookmark,
      payload: bookmark,
    });
  };

export const reorderBookmarks =
  (bookmarks: Bookmark[], categoryId: number) =>
  async (dispatch: Dispatch<ReorderBookmarksAction>) => {
    interface ReorderQuery {
      bookmarks: {
        id: number;
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = { bookmarks: [] };

      bookmarks.forEach((bookmark, index) =>
        updateQuery.bookmarks.push({
          id: bookmark.id,
          orderId: index + 1,
        })
      );

      await axios.put<ApiResponse<{}>>(
        '/api/bookmarks/0/reorder',
        updateQuery,
        { headers: applyAuth() }
      );

      dispatch({
        type: ActionType.reorderBookmarks,
        payload: { bookmarks, categoryId },
      });
    } catch (err) {
      console.log(err);
    }
  };

export const sortBookmarks =
  (categoryId: number) => async (dispatch: Dispatch<SortBookmarksAction>) => {
    try {
      const res = await axios.get<ApiResponse<Config>>('/api/config');

      dispatch({
        type: ActionType.sortBookmarks,
        payload: {
          orderType: res.data.data.useOrdering,
          categoryId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
