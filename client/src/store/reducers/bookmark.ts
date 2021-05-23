import { ActionTypes, Action } from '../actions';
import { Category, Bookmark } from '../../interfaces';

export interface State {
  loading: boolean;
  errors: string | undefined;
  categories: Category[];
}

const initialState: State = {
  loading: true,
  errors: undefined,
  categories: []
}

const getCategories = (state: State, action: Action): State => {
  return {
    ...state,
    loading: true,
    errors: undefined
  }
}

const getCategoriesSuccess = (state: State, action: Action): State => {
  return {
    ...state,
    loading: false,
    categories: action.payload
  }
} 

const bookmarkReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getCategories: return getCategories(state, action);
    case ActionTypes.getCategoriesSuccess: return getCategoriesSuccess(state, action);
    default: return state;
  }
}

export default bookmarkReducer;