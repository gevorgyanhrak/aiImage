import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const DELAY = 2500;
const GA_MEASUREMENT_ID = 'GTM-PQ45W6W';

const GoogleAnalyticsWrapper = () => {
  const { pathname } = useLocation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!pathname || hydrated) return;

    const timerId = setTimeout(() => {
      setHydrated(true);
    }, DELAY);

    return () => clearTimeout(timerId);
  }, [hydrated, pathname]);

  useEffect(() => {
    if (!hydrated) return;

    // Inject gtag.js script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Inject gtag config
    const configScript = document.createElement('script');
    configScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(configScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(configScript);
    };
  }, [hydrated]);

  return null;
};

export default GoogleAnalyticsWrapper;
