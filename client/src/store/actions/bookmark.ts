import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Category, ApiResponse, NewCategory, Bookmark, NewBookmark, Config } from '../../interfaces';
import { CreateNotificationAction } from './notification';

/**
 * GET CATEGORIES
 */
export interface GetCategoriesAction<T> {
  type: ActionTypes.getCategories | ActionTypes.getCategoriesSuccess | ActionTypes.getCategoriesError;
  payload: T;
}

export const getCategories = () => async (dispatch: Dispatch) => {
  dispatch<GetCategoriesAction<undefined>>({
    type: ActionTypes.getCategories,
    payload: undefined
  })

  try {
    const res = await axios.get<ApiResponse<Category[]>>('/api/categories');

    dispatch<GetCategoriesAction<Category[]>>({
      type: ActionTypes.getCategoriesSuccess,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

/**
 * ADD CATEGORY
 */
export interface AddCategoryAction {
  type: ActionTypes.addCategory,
  payload: Category
}

export const addCategory = (formData: NewCategory) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Category>>('/api/categories', formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Category ${formData.name} created`
      }
    })

    dispatch<AddCategoryAction>({
      type: ActionTypes.addCategory,
      payload: res.data.data
    })

    dispatch<any>(sortCategories());
  } catch (err) {
    console.log(err);
  }
}

/**
 * ADD BOOKMARK
 */
export interface AddBookmarkAction {
  type: ActionTypes.addBookmark,
  payload: Bookmark
}

export const addBookmark = (formData: NewBookmark | FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Bookmark>>('/api/bookmarks', formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Bookmark created`
      }
    })

    dispatch<AddBookmarkAction>({
      type: ActionTypes.addBookmark,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

/**
 * PIN CATEGORY
 */
export interface PinCategoryAction {
  type: ActionTypes.pinCategory,
  payload: Category
}

export const pinCategory = (category: Category) => async (dispatch: Dispatch) => {
  try {
    const { id, isPinned, name } = category;
    const res = await axios.put<ApiResponse<Category>>(`/api/categories/${id}`, { isPinned: !isPinned });

    const status = isPinned ? 'unpinned from Homescreen' : 'pinned to Homescreen';

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Category ${name} ${status}`
      }
    })

    dispatch<PinCategoryAction>({
      type: ActionTypes.pinCategory,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

/**
 * DELETE CATEGORY
 */
export interface DeleteCategoryAction {
  type: ActionTypes.deleteCategory,
  payload: number
}

export const deleteCategory = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete<ApiResponse<{}>>(`/api/categories/${id}`);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Category deleted`
      }
    })

    dispatch<DeleteCategoryAction>({
      type: ActionTypes.deleteCategory,
      payload: id
    })
  } catch (err) {
    console.log(err);
  }
}

/**
 * UPDATE CATEGORY
 */
export interface UpdateCategoryAction {
  type: ActionTypes.updateCategory,
  payload: Category
}

export const updateCategory = (id: number, formData: NewCategory) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<Category>>(`/api/categories/${id}`, formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Category ${formData.name} updated`
      }
    })

    dispatch<UpdateCategoryAction>({
      type: ActionTypes.updateCategory,
      payload: res.data.data
    })

    dispatch<any>(sortCategories());
  } catch (err) {
    console.log(err);
  }
}

/**
 * DELETE BOOKMARK
 */
export interface DeleteBookmarkAction {
  type: ActionTypes.deleteBookmark,
  payload: {
    bookmarkId: number,
    categoryId: number
  }
}

export const deleteBookmark = (bookmarkId: number, categoryId: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete<ApiResponse<{}>>(`/api/bookmarks/${bookmarkId}`);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: 'Bookmark deleted'
      }
    })

    dispatch<DeleteBookmarkAction>({
      type: ActionTypes.deleteBookmark,
      payload: {
        bookmarkId,
        categoryId
      }
    })
  } catch (err) {
    console.log(err);
  }
}

/**
 * UPDATE BOOKMARK
 */
export interface UpdateBookmarkAction {
  type: ActionTypes.updateBookmark,
  payload: Bookmark
}

export const updateBookmark = (
  bookmarkId: number,
  formData: NewBookmark | FormData,
  category: {
    prev: number,
    curr: number
  }
) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put<ApiResponse<Bookmark>>(`/api/bookmarks/${bookmarkId}`, formData);
    
    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Bookmark updated`
      }
    })

    // Check if category was changed
    const categoryWasChanged = category.curr !== category.prev;

    if (categoryWasChanged) {
      // Delete bookmark from old category
      dispatch<DeleteBookmarkAction>({
        type: ActionTypes.deleteBookmark,
        payload: {
          bookmarkId,
          categoryId: category.prev
        }
      })

      // Add bookmark to the new category
      dispatch<AddBookmarkAction>({
        type: ActionTypes.addBookmark,
        payload: res.data.data
      })
    } else {
      // Else update only name/url/icon
      dispatch<UpdateBookmarkAction>({
        type: ActionTypes.updateBookmark,
        payload: res.data.data
      })
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * SORT CATEGORIES
 */
export interface SortCategoriesAction {
  type: ActionTypes.sortCategories;
  payload: string;
}

export const sortCategories = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get<ApiResponse<Config>>('/api/config/useOrdering');

    dispatch<SortCategoriesAction>({
      type: ActionTypes.sortCategories,
      payload: res.data.data.value
    })
  } catch (err) {
    console.log(err);
  }
}

/**
 * REORDER CATEGORIES
 */
export interface ReorderCategoriesAction {
  type: ActionTypes.reorderCategories;
  payload: Category[];
}

interface ReorderQuery {
  categories: {
    id: number;
    orderId: number;
  }[]
}

export const reorderCategories = (categories: Category[]) => async (dispatch: Dispatch) => {
  try {
    const updateQuery: ReorderQuery = { categories: [] }

    categories.forEach((category, index) => updateQuery.categories.push({
      id: category.id,
      orderId: index + 1
    }))

    await axios.put<ApiResponse<{}>>('/api/categories/0/reorder', updateQuery);

    dispatch<ReorderCategoriesAction>({
      type: ActionTypes.reorderCategories,
      payload: categories
    })
  } catch (err) {
    console.log(err);
  }
}