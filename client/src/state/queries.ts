import axios, { AxiosError } from 'axios';
import { atom, useSetAtom } from 'jotai';
import { ApiResponse, Query } from '../interfaces';
import { applyAuth } from '../utility';
import { errorMessage, useCreateNotification } from './notification';

export const customQueriesAtom = atom<Query[]>([]);

export const useFetchQueries = () => {
  const setQueries = useSetAtom(customQueriesAtom);

  return async () => {
    try {
      const res = await axios.get<ApiResponse<Query[]>>('/api/queries');
      setQueries(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useAddQuery = () => {
  const createNotification = useCreateNotification();
  const setQueries = useSetAtom(customQueriesAtom);

  return async (query: Query) => {
    try {
      const res = await axios.post<ApiResponse<Query>>('/api/queries', query, {
        headers: applyAuth(),
      });
      setQueries((prev) => [...prev, res.data.data]);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      createNotification(
        errorMessage(error.response?.data.error ?? 'Unable to add query')
      );
    }
  };
};

export const useDeleteQuery = () => {
  const createNotification = useCreateNotification();
  const setQueries = useSetAtom(customQueriesAtom);

  return async (prefix: string) => {
    try {
      const res = await axios.delete<ApiResponse<Query[]>>(
        `/api/queries/${prefix}`,
        { headers: applyAuth() }
      );
      setQueries(res.data.data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      createNotification(
        errorMessage(error.response?.data.error ?? 'Unable to delete query')
      );
    }
  };
};

export const useUpdateQuery = () => {
  const createNotification = useCreateNotification();
  const setQueries = useSetAtom(customQueriesAtom);

  return async (query: Query, oldPrefix: string) => {
    try {
      const res = await axios.put<ApiResponse<Query[]>>(
        `/api/queries/${oldPrefix}`,
        query,
        { headers: applyAuth() }
      );
      setQueries(res.data.data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      createNotification(
        errorMessage(error.response?.data.error ?? 'Unable to update query')
      );
      console.log(err);
    }
  };
};
