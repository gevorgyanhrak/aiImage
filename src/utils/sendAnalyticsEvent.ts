import { EventType } from '@/types/analytics';

const sendAnalyticsEvent = (eventName: string, eventType: EventType = EventType.custom_event, data?: object) => {
  if (!window.dataLayer) return;

  const id = crypto.randomUUID();

  window.dataLayer.push({
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
