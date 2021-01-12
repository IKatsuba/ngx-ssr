import { isRawResponse } from './is-response-with-pagination';
import { Response } from '../interfaces/response';
import { coerceArray } from './coerce-array';

export function responseFactory<T>(
  rawResponse: any,
  modelFactory: (rawModel: any) => T
): T[] | Response<T> {
  if (!rawResponse) {
    return null;
  }

  if (isRawResponse<T>(rawResponse)) {
    return Response.fromJson<T>(rawResponse, modelFactory);
  }

  if (Array.isArray(rawResponse)) {
    return rawResponse.map(modelFactory);
  }

  return coerceArray(modelFactory(rawResponse));
}
