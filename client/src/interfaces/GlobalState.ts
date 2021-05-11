import { State as AppState } from '../store/reducers/app';
import { State as ThemeState } from '../store/reducers/theme';

export interface GlobalState {
  theme: ThemeState;
  app: AppState;
}