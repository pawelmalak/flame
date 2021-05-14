import { ActionTypes, Action } from '../actions';
import { Theme } from '../../interfaces/Theme';

export interface State {
  theme: Theme;
}

const initialState: State = {
  theme: {
    name: 'blues',
    colors: {
      background: '#2B2C56',
      primary: '#EFF1FC',
      accent: '#6677EB'
    }
  }
}

const themeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.setTheme: return { theme: action.payload };
    default: return state;
  }
}

export default themeReducer;