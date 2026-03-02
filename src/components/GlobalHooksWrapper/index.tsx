'use client';

import useResetStore from '@/store/resetStore';
import useScrollRestoration from '@/hooks/useScrollRestoration';

const GlobalHooksWrapper = () => {
  useResetStore();
  useScrollRestoration();

  return null;
};

export default GlobalHooksWrapper;
