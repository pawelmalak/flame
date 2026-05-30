import type { Dispatch, SetStateAction } from 'react';

export const useFormStateUpdater =
  <S extends object>(setState: Dispatch<SetStateAction<S>>) =>
  <K extends keyof S>(key: K) =>
  (value: S[K]) => {
    setState(state => ({ ...state, [key]: value }));
  };
