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
    case ActionType.getCategories: {
      return {
        ...state,
        loading: true,
        errors: undefined,
      };
    }

    case ActionType.getCategoriesSuccess: {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    }

    case ActionType.addCategory: {
      return {
        ...state,
        categories: [...state.categories, { ...action.payload, bookmarks: [] }],
      };
    }

    case ActionType.addBookmark: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const targetCategory = {
        ...state.categories[categoryIdx],
        bookmarks: [...state.categories[categoryIdx].bookmarks, action.payload],
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          targetCategory,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };
    }

    case ActionType.pinCategory: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          {
            ...action.payload,
            bookmarks: [...state.categories[categoryIdx].bookmarks],
          },
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    case ActionType.deleteCategory: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    case ActionType.updateCategory: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          {
            ...action.payload,
            bookmarks: [...state.categories[categoryIdx].bookmarks],
          },
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    case ActionType.deleteBookmark: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const targetCategory = {
        ...state.categories[categoryIdx],
        bookmarks: state.categories[categoryIdx].bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload.bookmarkId
        ),
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          targetCategory,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };
    }

    case ActionType.updateBookmark: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const bookmarkIdx = state.categories[categoryIdx].bookmarks.findIndex(
        (bookmark) => bookmark.id === action.payload.id
      );

      const targetCategory = {
        ...state.categories[categoryIdx],
        bookmarks: [
          ...state.categories[categoryIdx].bookmarks.slice(0, bookmarkIdx),
          action.payload,
          ...state.categories[categoryIdx].bookmarks.slice(bookmarkIdx + 1),
        ],
      };

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          targetCategory,
          ...state.categories.slice(categoryIdx + 1),
        ],
        categoryInEdit: targetCategory,
      };
    }

    case ActionType.sortCategories: {
      return {
        ...state,
        categories: sortData<Category>(state.categories, action.payload),
      };
    }

    case ActionType.reorderCategories: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case ActionType.setEditCategory: {
      return {
        ...state,
        categoryInEdit: action.payload,
      };
    }

    case ActionType.setEditBookmark: {
      return {
        ...state,
        bookmarkInEdit: action.payload,
      };
    }

    case ActionType.reorderBookmarks: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          {
            ...state.categories[categoryIdx],
            bookmarks: action.payload.bookmarks,
          },
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    case ActionType.sortBookmarks: {
      const categoryIdx = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );

      const sortedBookmarks = sortData<Bookmark>(
        state.categories[categoryIdx].bookmarks,
        action.payload.orderType
      );

      return {
        ...state,
        categories: [
          ...state.categories.slice(0, categoryIdx),
          {
            ...state.categories[categoryIdx],
            bookmarks: sortedBookmarks,
          },
          ...state.categories.slice(categoryIdx + 1),
        ],
      };
    }

    default:
      return state;
  }
};
