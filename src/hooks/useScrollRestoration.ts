import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Force scroll to top on route changes.
 */
const useScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollRestoration;
