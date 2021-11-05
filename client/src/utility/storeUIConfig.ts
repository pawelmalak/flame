import { Config } from '../interfaces';

export const storeUIConfig = <K extends keyof Config>(
  key: K,
  config: Config
) => {
  localStorage.setItem(key, `${config[key]}`);
};
