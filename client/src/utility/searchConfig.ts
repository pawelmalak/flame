import { store } from '../store/store';

/**
 * Search config store with given key
 * @param key Config pair key to search
 * @param _default Value to return if key is not found
 */
export const searchConfig = (key: string, _default: any)=> {
  const state = store.getState();

  const pair = state.config.config.find(p => p.key === key);

  if (pair) {
    if (pair.valueType === 'number') {
      return parseFloat(pair.value);
    } else if (pair.valueType === 'boolean') {
      return parseInt(pair.value);
    } else {
      return pair.value;
    }
  } else {
    return _default;
  }
}