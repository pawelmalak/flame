import { ChangeEvent, SetStateAction } from 'react';

type Event = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

interface Options {
  isNumber?: boolean;
  isBool?: boolean;
}

interface Params<T> {
  e: Event;
  options?: Options;
  setStateHandler: (v: SetStateAction<T>) => void;
  state: T;
}

export const inputHandler = <T>(params: Params<T>): void => {
  const { e, options, setStateHandler, state } = params;

  const rawValue = e.target.value;
  let value: string | number | boolean = e.target.value;

  if (options) {
    const { isNumber = false, isBool = false } = options;

    if (isNumber) {
      value = parseFloat(rawValue);
    }

    if (isBool) {
      value = !!parseInt(rawValue);
    }
  }

  setStateHandler({
    ...state,
    [e.target.name]: value,
  });
};
