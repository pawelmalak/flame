import {
  // Theme
  SetThemeAction,
  // Apps
  GetAppsAction,
  PinAppAction,
  AddAppAction,
  DeleteAppAction,
  UpdateAppAction,
  // Categories
  GetCategoriesAction,
  AddCategoryAction,
  PinCategoryAction,
  DeleteCategoryAction,
  UpdateCategoryAction,
  // Bookmarks
  AddBookmarkAction,
  DeleteBookmarkAction,
  UpdateBookmarkAction,
  // Notifications
  CreateNotificationAction,
  ClearNotificationAction,
  // Config
  GetConfigAction,
  UpdateConfigAction
} from './';

export enum ActionTypes {
  // Theme
  setTheme = 'SET_THEME',
  // Apps
  getApps = 'GET_APPS',
  getAppsSuccess = 'GET_APPS_SUCCESS',
  getAppsError = 'GET_APPS_ERROR',
  pinApp = 'PIN_APP',
  addApp = 'ADD_APP',
  addAppSuccess = 'ADD_APP_SUCCESS',
  deleteApp = 'DELETE_APP',
  updateApp = 'UPDATE_APP',
  // Categories
  getCategories = 'GET_CATEGORIES',
  getCategoriesSuccess = 'GET_CATEGORIES_SUCCESS',
  getCategoriesError = 'GET_CATEGORIES_ERROR',
  addCategory = 'ADD_CATEGORY',
  pinCategory = 'PIN_CATEGORY',
  deleteCategory = 'DELETE_CATEGORY',
  updateCategory = 'UPDATE_CATEGORY',
  // Bookmarks
  addBookmark = 'ADD_BOOKMARK',
  deleteBookmark = 'DELETE_BOOKMARK',
  updateBookmark = 'UPDATE_BOOKMARK',
  // Notifications
  createNotification = 'CREATE_NOTIFICATION',
  clearNotification = 'CLEAR_NOTIFICATION',
  // Config
  getConfig = 'GET_CONFIG',
  updateConfig = 'UPDATE_CONFIG'
}

export type Action = 
  // Theme
  SetThemeAction |
  // Apps
  GetAppsAction<any> |
  PinAppAction |
  AddAppAction |
  DeleteAppAction |
  UpdateAppAction |
  // Categories
  GetCategoriesAction<any> |
  AddCategoryAction |
  PinCategoryAction |
  DeleteCategoryAction |
  UpdateCategoryAction |
  // Bookmarks
  AddBookmarkAction |
  DeleteBookmarkAction |
  UpdateBookmarkAction |
  // Notifications
  CreateNotificationAction |
  ClearNotificationAction |
  // Config
  GetConfigAction |
  UpdateConfigAction;