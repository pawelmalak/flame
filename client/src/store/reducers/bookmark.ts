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
  return {
    ...state,
    categories: [
      ...state.categories,
      {
        ...action.payload,
        bookmarks: []
      }
    ]
  }
}

const addBookmark = (state: State, action: Action): State => {
  const categoryIndex = state.categories.findIndex((category: Category) => category.id === action.payload.categoryId);

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, categoryIndex),
      {
        ...state.categories[categoryIndex],
        bookmarks: [
          ...state.categories[categoryIndex].bookmarks,
          {
            ...action.payload
          }
        ]
      },
      ...state.categories.slice(categoryIndex + 1)
    ]
  }
}

const pinCategory = (state: State, action: Action): State => {
  const tmpCategories = [...state.categories];
  const changedCategory = tmpCategories.find((category: Category) => category.id === action.payload.id);

  if (changedCategory) {
    changedCategory.isPinned = action.payload.isPinned;
  }

  return {
    ...state,
    categories: tmpCategories
  }
}

const deleteCategory = (state: State, action: Action): State => {
  const categoryIndex = state.categories.findIndex((category: Category) => category.id === action.payload);

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, categoryIndex),
      ...state.categories.slice(categoryIndex + 1)
    ]
  }
}

const updateCategory = (state: State, action: Action): State => {
  const tmpCategories = [...state.categories];
  const categoryInUpdate = tmpCategories.find((category: Category) => category.id === action.payload.id);

  if (categoryInUpdate) {
    categoryInUpdate.name = action.payload.name;
  }

  return {
    ...state,
    categories: tmpCategories
  }
}

const deleteBookmark = (state: State, action: Action): State => {
  const tmpCategories = [...state.categories];
  const categoryInUpdate = tmpCategories.find((category: Category) => category.id === action.payload.categoryId);

  if (categoryInUpdate) {
    categoryInUpdate.bookmarks = categoryInUpdate.bookmarks.filter((bookmark: Bookmark) => bookmark.id !== action.payload.bookmarkId);
  }

  
  return {
    ...state,
    categories: tmpCategories
  }
}

const updateBookmark = (state: State, action: Action): State => {
  let categoryIndex = state.categories.findIndex((category: Category) => category.id === action.payload.categoryId);
  let bookmarkIndex = state.categories[categoryIndex].bookmarks.findIndex((bookmark: Bookmark) => bookmark.id === action.payload.id);

  return {
    ...state,
    categories: [
      ...state.categories.slice(0, categoryIndex),
      {
        ...state.categories[categoryIndex],
        bookmarks: [
          ...state.categories[categoryIndex].bookmarks.slice(0, bookmarkIndex),
          {
            ...action.payload
          },
          ...state.categories[categoryIndex].bookmarks.slice(bookmarkIndex + 1)
        ]
      },
      ...state.categories.slice(categoryIndex + 1)
    ]
  }
}

const bookmarkReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.getCategories: return getCategories(state, action);
    case ActionTypes.getCategoriesSuccess: return getCategoriesSuccess(state, action);
    case ActionTypes.addCategory: return addCategory(state, action);
    case ActionTypes.addBookmark: return addBookmark(state, action);
    case ActionTypes.pinCategory: return pinCategory(state, action);
    case ActionTypes.deleteCategory: return deleteCategory(state, action);
    case ActionTypes.updateCategory: return updateCategory(state, action);
    case ActionTypes.deleteBookmark: return deleteBookmark(state, action);
    case ActionTypes.updateBookmark: return updateBookmark(state, action);
    default: return state;
  }
}

export default bookmarkReducer;