import type { SearchParams } from '@/types/common';

const setInSessionStorage = (key: string, value: string | string[]) => {
  const parsedValue = Array.isArray(value) ? value.join(',') : value;

  sessionStorage.setItem(key, parsedValue);
};

const getValueAndSetInStorage = (key: string, params: SearchParams) => {
  const value = params[key];

  if (!value) return;

  setInSessionStorage(key, value);
};

/*
 * Sets the value of the key or keys in session storage.
 * @param keys - The key or keys get the value from params. If it's an array, it will set each key in session storage.
 * @param params - Object that contains URL query parameters.
 */

const setParamsInSessionStorage = (keys: string | string[], params: SearchParams) => {
  if (!window.sessionStorage) return;

  if (Array.isArray(keys)) {
    keys.forEach(key => {
      getValueAndSetInStorage(key, params);
    });

    return;
  }

  getValueAndSetInStorage(keys, params);
};

export default setParamsInSessionStorage;
