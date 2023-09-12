export type TPaginateOptions = {
  page: number;
  limit: number;
  search_term?: string;
};

export type TPaginateMeta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type TPaginateResponse<T> = {
  items: T[];
  meta: TPaginateMeta;
};
