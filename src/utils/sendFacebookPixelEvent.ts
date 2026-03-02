import type { FacebookPixelEvent, FacebookPixelParams } from '@/types/facebookPixel';

/**
 * Sends a Facebook Pixel event
 * @param eventName - Standard event name or custom event string
 * @param params - Optional event parameters
 * @param isCustomEvent - Set to true for custom events (uses trackCustom instead of track)
 */
const sendFacebookPixelEvent = (eventName: FacebookPixelEvent | string, params?: FacebookPixelParams, isCustomEvent = false) => {
  if (typeof window === 'undefined' || !window.fbq) return;

  try {
    const command = isCustomEvent ? 'trackCustom' : 'track';

    if (params) {
      window.fbq(command, eventName, params);
    } else {
      window.fbq(command, eventName);
    }
  } catch (error) {
    console.error('Failed to send Facebook Pixel event:', error);
  }
};

export default sendFacebookPixelEvent;
