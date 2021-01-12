import { RawPagination } from './raw-pagination';

export interface RawResponse<T> {
  info: RawPagination;
  results: T[];
}
