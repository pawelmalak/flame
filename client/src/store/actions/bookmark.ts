import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Category, ApiResponse, NewCategory, Bookmark, NewBookmark } from '../../interfaces';

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

export interface AddCategoryAction {
  type: ActionTypes.addCategory,
  payload: Category
}

export const addCategory = (formData: NewCategory) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Category>>('/api/categories', formData);

    dispatch<AddCategoryAction>({
      type: ActionTypes.addCategory,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}

export interface AddBookmarkAction {
  type: ActionTypes.addBookmark,
  payload: Bookmark
}

export const addBookmark = (formData: NewBookmark) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post<ApiResponse<Bookmark>>('/api/bookmarks', formData);

    dispatch<AddBookmarkAction>({
      type: ActionTypes.addBookmark,
      payload: res.data.data
    })
  } catch (err) {
    console.log(err);
  }
}