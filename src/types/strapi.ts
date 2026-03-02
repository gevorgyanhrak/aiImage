export interface StrapiPagination {
  start: number;
  limit: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}
