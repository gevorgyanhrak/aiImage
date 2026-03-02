import type NextFetchOptions from './types/nextFetchOptions';

const nextFetch = (input: string | URL | Request, init?: NextFetchOptions) => {
  return fetch(input, init);
};

export default nextFetch;
