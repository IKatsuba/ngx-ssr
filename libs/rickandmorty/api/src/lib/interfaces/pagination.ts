import { RawPagination } from './raw-pagination';
import { extractSearchParamsFromUrl } from '../helpers/extract-search-params-from-url';

export class Pagination<T> {
  count: number;
  pages: number;
  next: T;
  prev: T;

  public static fromJson<T>({
    next,
    prev,
    ...common
  }: RawPagination): Pagination<T> {
    const pagination = new Pagination<T>();

    Object.assign(pagination, common);

    pagination.next = extractSearchParamsFromUrl(next);

    pagination.prev = extractSearchParamsFromUrl(prev);

    return pagination;
  }
}
