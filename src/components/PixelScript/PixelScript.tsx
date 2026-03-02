import Script from 'next/script';
import Image from 'next/image';

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const FACEBOOK_PIXEL_SCRIPT_URL = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_SCRIPT_URL || 'https://connect.facebook.net/en_US/fbevents.js';

const PixelScript = () => {
  if (!FACEBOOK_PIXEL_ID) return null;

  return (
    <>
      <Script id="pixel-config" strategy="lazyOnload">
        {`
          window.FB_PIXEL_CONFIG = {
            pixelId: '${FACEBOOK_PIXEL_ID}',
            scriptUrl: '${FACEBOOK_PIXEL_SCRIPT_URL}'
          };
        `}
      </Script>
      <Script src="/scripts/fbPixel.js" strategy="lazyOnload" />
      <noscript>
        <Image className="hidden" unoptimized height="1" width="1" alt="Facebook Pixel" src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
};

export default PixelScript;
