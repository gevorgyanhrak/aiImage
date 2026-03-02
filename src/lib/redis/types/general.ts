import type EventType from './events';

export interface HubData {
  id: number;
  slug: string;
  documentId: string;
}

export interface LandingData {
  id: number;
  slug: string;
  documentId: string;
  publishedAt?: string;
  title?: string;
}

export interface PublishedEvent {
  type: EventType;
  data: {
    hubs?: HubData[];
    landings?: LandingData[];
  };
}
