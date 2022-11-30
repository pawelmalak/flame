import axios from 'axios';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ApiResponse, App, Config, NewApp } from '../interfaces';
import { applyAuth, insertAt, sortData } from '../utility';
import { configAtom } from './config';
import { successMessage, useCreateNotification } from './notification';

export const appsLoadingAtom = atom(true);
export const appsAtom = atom<App[]>([]);
export const appInUpdateAtom = atom<App | null>(null);

export const useFetchApps = () => {
  const setAppsLoading = useSetAtom(appsLoadingAtom);
  const setApps = useSetAtom(appsAtom);

  return async () => {
    setAppsLoading(true);

    try {
      const res = await axios.get<ApiResponse<App[]>>('/api/apps', {
        headers: applyAuth(),
      });

      setApps(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setAppsLoading(false);
    }
  };
};

export const usePinApp = () => {
  const apps = useAtomValue(appsAtom);
  const setSortedApps = useSetSortedApps();
  const createNotification = useCreateNotification();

  return async (app: App) => {
    try {
      const { id, isPinned, name } = app;
      const res = await axios.put<ApiResponse<App>>(
        `/api/apps/${id}`,
        { isPinned: !isPinned },
        { headers: applyAuth() }
      );

      const status = isPinned
        ? 'unpinned from Homescreen'
        : 'pinned to Homescreen';

      createNotification(successMessage(`App ${name} ${status}`));
      const appIdx = apps.findIndex(({ id }) => id === res.data.data.id);
      setSortedApps(insertAt(apps, appIdx, res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const useAddApp = () => {
  const apps = useAtomValue(appsAtom);
  const setSortApps = useSetSortedApps();
  const createNotification = useCreateNotification();

  return async (formData: NewApp | FormData) => {
    try {
      const res = await axios.post<ApiResponse<App>>('/api/apps', formData, {
        headers: applyAuth(),
      });

      createNotification(successMessage('App added'));

      setSortApps([...apps, res.data.data]);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useDeleteApp = () => {
  const setApps = useSetAtom(appsAtom);
  const createNotification = useCreateNotification();

  return async (deleteId: App['id']) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/apps/${deleteId}`, {
        headers: applyAuth(),
      });

      createNotification(successMessage('App deleted'));
      setApps((prev) => prev.filter(({ id }) => id !== deleteId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const useUpdateApp = () => {
  const apps = useAtomValue(appsAtom);
  const setSortedApps = useSetSortedApps();
  const createNotification = useCreateNotification();

  return async (updateId: App['id'], formData: NewApp | FormData) => {
    try {
      const res = await axios.put<ApiResponse<App>>(
        `/api/apps/${updateId}`,
        formData,
        { headers: applyAuth() }
      );

      createNotification(successMessage('App updated'));
      const appIdx = apps.findIndex(({ id }) => id === res.data.data.id);
      setSortedApps(insertAt(apps, appIdx, res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const useReorderApps = () => {
  const setApps = useSetAtom(appsAtom);
  return async (apps: App[]) => {
    interface ReorderQuery {
      apps: {
        id: App['id'];
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = {
        apps: apps.map((app, index) => ({
          id: app.id,
          orderId: index + 1,
        })),
      };

      await axios.put<ApiResponse<{}>>('/api/apps/0/reorder', updateQuery, {
        headers: applyAuth(),
      });

      setApps(apps);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useSetSortedApps = () => {
  const { useOrdering } = useAtomValue(configAtom);
  const [apps, setApps] = useAtom(appsAtom);

  return (localApps?: App[]) => {
    setApps(sortData<App>(localApps || apps, useOrdering));
  };
};
