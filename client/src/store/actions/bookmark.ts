import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './actionTypes';
import { Category, ApiResponse } from '../../interfaces';

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