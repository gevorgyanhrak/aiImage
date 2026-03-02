import { EventType } from '@/types/analytics';

const sendAnalyticsEvent = (eventName: string, eventType: EventType = EventType.custom_event, data?: object) => {
  const dataLayer = (window as unknown as { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  if (!dataLayer) return;

  const id = crypto.randomUUID();

  dataLayer.push({
    event: eventType,
    data: {
      action: eventName,
      id,
      filterId: `${eventType}_${eventName}`,
      ...(data && { parameters: data }),
    },
  });
};

export default sendAnalyticsEvent;
