export enum FacebookPixelEvent {
  Lead = 'Lead',
}

export type FacebookPixelParams = {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  contents?: Array<{ id: string; quantity: number }>;
  currency?: string;
  value?: number;
  num_items?: number;
  predicted_ltv?: number;
  search_string?: string;
  status?: boolean;
  [key: string]: unknown;
};

declare global {
  interface Window {
    fbq?: (command: 'track' | 'trackCustom' | 'init' | 'set' | 'dataProcessingOptions', eventName: string | string[], params?: FacebookPixelParams | number, secondParam?: number) => void;
  }
}

export {};
