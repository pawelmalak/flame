import { State as AppState } from '../store/reducers/app';
import { State as ThemeState } from '../store/reducers/theme';
import { State as BookmarkState } from '../store/reducers/bookmark';

export interface GlobalState {
  theme: ThemeState;
  app: AppState;
  bookmark: BookmarkState;
}