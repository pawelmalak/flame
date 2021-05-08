import { SET_THEME } from '../actions/actionTypes';

const initialState = {
  theme: 'blues'
}

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return {
        theme: action.payload
      };
    default:
      return state;
  }
}

export default themeReducer;