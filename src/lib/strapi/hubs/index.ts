import { mockHub } from '@/mocks/data';

import type { HubsResponse } from '@/types/hubs';

type GetHubByDocumentIdOptions = {
  landingsLimit?: number;
};

export function getHubByDocumentId(_documentId: string, _options?: GetHubByDocumentIdOptions): HubsResponse {
  return mockHub;
}
