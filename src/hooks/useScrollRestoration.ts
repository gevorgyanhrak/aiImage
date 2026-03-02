import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Workaround:
 * Force scroll to top to prevent scroll position from persisting between route changes.
 * See: https://github.com/vercel/next.js/discussions/64435
 */
const useScrollRestoration = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollRestoration;
