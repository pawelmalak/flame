import axios from 'axios';
import { atom, useSetAtom } from 'jotai';
import { ApiResponse, Config } from '../interfaces';
import { ConfigFormData } from '../types';
import { applyAuth, configTemplate, storeUIConfig } from '../utility';
import { successMessage, useCreateNotification } from './notification';

export const configLoadingAtom = atom(true);
export const configAtom = atom<Config>(configTemplate);

const persistedConfigKeys: (keyof Config)[] = [
  'useAmericanDate',
  'greetingsSchema',
  'daySchema',
  'monthSchema',
  'showTime',
  'hideDate',
];

const useReplaceConfig = () => {
  const setConfig = useSetAtom(configAtom);

  return (config: Config) => {
    setConfig(config);
    persistedConfigKeys.forEach((key) => storeUIConfig(key, config));
    document.title = config.customTitle;
  };
};

export const useFetchConfig = () => {
  const setConfigLoading = useSetAtom(configLoadingAtom);
  const setConfig = useSetAtom(configAtom);

  return async () => {
    setConfigLoading(true);

    try {
      const res = await axios.get<ApiResponse<Config>>('/api/config');
      const config = res.data.data;

      setConfig(config);
      persistedConfigKeys.forEach((key) => storeUIConfig(key, config));
      document.title = config.customTitle;
      setConfigLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useUpdateConfig = () => {
  const createNotification = useCreateNotification();
  const replaceConfig = useReplaceConfig();

  return async (formData: ConfigFormData) => {
    try {
      const res = await axios.put<ApiResponse<Config>>(
        '/api/config',
        formData,
        { headers: applyAuth() }
      );
      const config = res.data.data;
      replaceConfig(config);
      createNotification(successMessage('Settings updated'));
    } catch (err) {
      console.log(err);
    }
  };
};
