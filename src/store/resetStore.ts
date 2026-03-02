import { useEffect } from 'react';
import { getAppStore } from './store';

/**
 * Custom hook to reset specific parts of the Zustand store when a component mounts.
 *
 * This is useful for page-specific state that should start fresh every time the page is loaded.
 */

const useResetStore = () => {
  useEffect(() => {
    getAppStore().clearAll();
  }, []);
};

export default useResetStore;
