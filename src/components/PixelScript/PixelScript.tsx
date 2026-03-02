import { useEffect } from 'react';

const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

const PixelScript = () => {
  useEffect(() => {
    if (!FACEBOOK_PIXEL_ID) return;

    // Inline config script
    const configScript = document.createElement('script');
    configScript.textContent = `
      window.FB_PIXEL_CONFIG = {
        pixelId: '${FACEBOOK_PIXEL_ID}',
        scriptUrl: '${import.meta.env.VITE_FACEBOOK_PIXEL_SCRIPT_URL || 'https://connect.facebook.net/en_US/fbevents.js'}'
      };
    `;
    document.head.appendChild(configScript);

    // External pixel script
    const pixelScript = document.createElement('script');
    pixelScript.src = '/scripts/fbPixel.js';
    document.head.appendChild(pixelScript);

    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(pixelScript);
    };
  }, []);

  if (!FACEBOOK_PIXEL_ID) return null;

  return (
    <noscript>
      <img className="hidden" height="1" width="1" alt="Facebook Pixel" src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`} />
    </noscript>
  );
};

export default PixelScript;
