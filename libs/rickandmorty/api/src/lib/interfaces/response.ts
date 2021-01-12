import { Pagination } from './pagination';
import { RawResponse } from './raw-response';
import { Filter } from './filter';

export class Response<T, F extends Filter = Filter> {
  info: Pagination<F>;
  results: T[];

  public static fromJson<T>(
    { info, results }: RawResponse<T>,
    modelFactory: (rawModel: any) => T
  ): Response<T> {
    const response = new Response<T>();

    response.info = Pagination.fromJson(info);
    response.results = results.map(modelFactory);

    return response;
  }
}
