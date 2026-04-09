export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}

export interface ListResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
