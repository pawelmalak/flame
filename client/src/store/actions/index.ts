import { App } from '../../interfaces';

import {
  AddThemeAction,
  DeleteThemeAction,
  EditThemeAction,
  FetchThemesAction,
  SetThemeAction,
  UpdateThemeAction,
} from './theme';

import {
  AddQueryAction,
  DeleteQueryAction,
  FetchQueriesAction,
  GetConfigAction,
  UpdateConfigAction,
  UpdateQueryAction,
} from './config';

import {
  ClearNotificationAction,
  CreateNotificationAction,
} from './notification';

import {
  GetAppsAction,
  PinAppAction,
  AddAppAction,
  DeleteAppAction,
  UpdateAppAction,
  ReorderAppsAction,
  SortAppsAction,
  SetEditAppAction,
} from './app';

import {
  GetCategoriesAction,
  AddCategoryAction,
  PinCategoryAction,
  DeleteCategoryAction,
  UpdateCategoryAction,
  SortCategoriesAction,
  ReorderCategoriesAction,
  AddBookmarkAction,
  DeleteBookmarkAction,
  UpdateBookmarkAction,
  SetEditCategoryAction,
  SetEditBookmarkAction,
  ReorderBookmarksAction,
  SortBookmarksAction,
} from './bookmark';

import {
  AuthErrorAction,
  AutoLoginAction,
  LoginAction,
  LogoutAction,
} from './auth';

export type Action =
  // Theme
  | SetThemeAction
  | FetchThemesAction
  | AddThemeAction
  | DeleteThemeAction
  | UpdateThemeAction
  | EditThemeAction
  // Config
  | GetConfigAction
  | UpdateConfigAction
  | AddQueryAction
  | DeleteQueryAction
  | FetchQueriesAction
  | UpdateQueryAction
  // Notifications
  | CreateNotificationAction
  | ClearNotificationAction
  // Apps
  | GetAppsAction<undefined | App[]>
  | PinAppAction
  | AddAppAction
  | DeleteAppAction
  | UpdateAppAction
  | ReorderAppsAction
  | SortAppsAction
  | SetEditAppAction
  // Categories
  | GetCategoriesAction<any>
  | AddCategoryAction
  | PinCategoryAction
  | DeleteCategoryAction
  | UpdateCategoryAction
  | SortCategoriesAction
  | ReorderCategoriesAction
  | SetEditCategoryAction
  // Bookmarks
  | AddBookmarkAction
  | DeleteBookmarkAction
  | UpdateBookmarkAction
  | SetEditBookmarkAction
  | ReorderBookmarksAction
  | SortBookmarksAction
  // Auth
  | LoginAction
  | LogoutAction
  | AutoLoginAction
  | AuthErrorAction;
