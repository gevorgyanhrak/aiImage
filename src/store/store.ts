import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import usePreviewStore, { type IPreviewState } from './preview';
import useAuthStore, { type IAuthState } from './auth';

export type IAppStore = IPreviewState & IAuthState;

const compare = <T>(a: T, b: T) => a === b || shallow(a, b);

export const useAppStore = createWithEqualityFn<IAppStore>(
  (...props) => ({
    ...usePreviewStore(...props),
    ...useAuthStore(...props),
  }),
  compare,
);

export const getAppStore = useAppStore.getState;
export const setAppStore = useAppStore.setState;
