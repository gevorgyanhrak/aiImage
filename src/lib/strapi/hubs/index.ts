import { mockHub } from '@/mocks/data';
import type { HubsResponse } from '@/types/hubs';

type GetHubByDocumentIdOptions = {
  landingsLimit?: number;
  cache?: RequestCache;
  tags?: string[];
};

export async function getHubByDocumentId(_documentId: string, _options?: GetHubByDocumentIdOptions): Promise<HubsResponse> {
  return mockHub;
}
