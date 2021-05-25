import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Category, ApiResponse, NewCategory, Bookmark, NewBookmark } from '../../interfaces';
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

export const addBookmark = (formData: NewBookmark) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Bookmark>>('/api/bookmarks', formData);

    dispatch<CreateNotificationAction>({
      type: ActionTypes.createNotification,
      payload: {
        title: 'Success',
        message: `Bookmark ${formData.name} created`
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
    const res = await axios.delete<ApiResponse<{}>>(`/api/categories/${id}`);

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