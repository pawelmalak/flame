import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GET_APPS,
  GET_APPS_SUCCESS,
  GET_APPS_ERROR
} from './actionTypes';

export const getApps = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_APPS });

  try {
    const res = await axios.get('/api/apps');

    dispatch({
      type: GET_APPS_SUCCESS,
      payload: res.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_APPS_ERROR,
      payload: err.data.data
    })
  }
}