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

const addCategory = (state: State, action: Action): State => {
  const tmpCategories = [...state.categories, {
    ...action.payload,
    bookmarks: []
  }];

  return {
    ...state,
    categories: tmpCategories
  }
}

const addBookmark = (state: State, action: Action): State => {
  const tmpCategories = [...state.categories];
  const tmpCategory = tmpCategories.find((category: Category) => category.id === action.payload.categoryId);

  if (tmpCategory) {
    tmpCategory.bookmarks.push(action.payload);
  }

  return {
    ...state,
    categories: tmpCategories
  }
}

const bookmarkReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getCategories: return getCategories(state, action);
    case ActionTypes.getCategoriesSuccess: return getCategoriesSuccess(state, action);
    case ActionTypes.addCategory: return addCategory(state, action);
    case ActionTypes.addBookmark: return addBookmark(state, action);
    default: return state;
  }
}

export default bookmarkReducer;