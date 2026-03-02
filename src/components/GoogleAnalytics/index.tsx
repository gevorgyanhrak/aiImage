'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const GoogleAnalytics = dynamic(() => import('@next/third-parties/google').then(mod => mod.GoogleAnalytics), { ssr: false });

// Delay loading Google Analytics after the LCP
const DELAY = 2500;
const GA_MEASUREMENT_ID = 'GTM-PQ45W6W';

const GoogleAnalyticsWrapper = () => {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!pathname || hydrated) return;

    const timerId = setTimeout(() => {
      setHydrated(true);
    }, DELAY);

    return () => clearTimeout(timerId);
  }, [hydrated, pathname]);

  if (!hydrated) return null;

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};

export default GoogleAnalyticsWrapper;
