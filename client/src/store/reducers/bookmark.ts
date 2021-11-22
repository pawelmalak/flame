import { Bookmark, Category } from '../../interfaces';
import { sortData } from '../../utility';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BookmarksState {
  loading: boolean;
  errors: string | undefined;
  categories: Category[];
  categoryInEdit: Category | null;
  bookmarkInEdit: Bookmark | null;
}

const initialState: BookmarksState = {
  loading: true,
  errors: undefined,
  categories: [],
  categoryInEdit: null,
  bookmarkInEdit: null,
};

export const bookmarksReducer = (
  state: BookmarksState = initialState,
  action: Action
): BookmarksState => {
  switch (action.type) {
    case ActionType.getCategories:
      return {
        ...state,
        loading: true,
        errors: undefined,
      };

    case ActionType.getCategoriesSuccess:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case ActionType.addCategory:
      return {
        ...state,
        categories: [...state.categories, { ...action.payload, bookmarks: [] }],
      };

    case ActionType.addBookmark:
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const categoryWithNewBookmark = {
        ...state.categories[categoryIdx],
        bookmarks: [...state.categories[categoryIdx].bookmarks, action.payload],
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          categoryWithNewBookmark,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: categoryWithNewBookmark,
      };

    case ActionType.pinCategory:
      const pinnedCategoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, pinnedCategoryIdx),
          {
            ...action.payload,
            bookmarks: [...state.categories[pinnedCategoryIdx].bookmarks],
          },
          ...state.categories.slice(pinnedCategoryIdx + 1),
        ],
      };

    case ActionType.deleteCategory:
      const deletedCategoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, deletedCategoryIdx),
          ...state.categories.slice(deletedCategoryIdx + 1),
        ],
      };

    case ActionType.updateCategory:
      const updatedCategoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, updatedCategoryIdx),
          {
            ...action.payload,
            bookmarks: [...state.categories[updatedCategoryIdx].bookmarks],
          },
          ...state.categories.slice(updatedCategoryIdx + 1),
        ],
      };

    case ActionType.deleteBookmark:
      const categoryInUpdateIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const targetCategory = {
        ...state.categories[categoryInUpdateIdx],
        bookmarks: state.categories[categoryInUpdateIdx].bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload.bookmarkId
        ),
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryInUpdateIdx),
          targetCategory,
          ...state.categories.slice(categoryInUpdateIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };

    case ActionType.updateBookmark:
      const parentCategoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const updatedBookmarkIdx = state.categories[
        parentCategoryIdx
      ].bookmarks.findIndex((bookmark) => bookmark.id === action.payload.id);

      const categoryWithUpdatedBookmark = {
        ...state.categories[parentCategoryIdx],
        bookmarks: [
          ...state.categories[parentCategoryIdx].bookmarks.slice(
            0,
            updatedBookmarkIdx
          ),
          action.payload,
          ...state.categories[parentCategoryIdx].bookmarks.slice(
            updatedBookmarkIdx + 1
          ),
        ],
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, parentCategoryIdx),
          categoryWithUpdatedBookmark,
          ...state.categories.slice(parentCategoryIdx + 1),
        ],
        categoryInEdit: categoryWithUpdatedBookmark,
      };

    case ActionType.sortCategories:
      return {
        ...state,
        categories: sortData<Category>(state.categories, action.payload),
      };

    case ActionType.reorderCategories:
      return {
        ...state,
        categories: action.payload,
      };

    case ActionType.setEditCategory:
      return {
        ...state,
        categoryInEdit: action.payload,
      };

    case ActionType.setEditBookmark:
      return {
        ...state,
        bookmarkInEdit: action.payload,
      };

    default:
      return state;
  }
};
