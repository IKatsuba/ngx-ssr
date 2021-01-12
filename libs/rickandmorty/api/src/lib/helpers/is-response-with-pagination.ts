import { RawResponse } from '../interfaces/raw-response';

export function isRawResponse<T>(value: any): value is RawResponse<T> {
  return !!value?.info && !!value?.results;
}
