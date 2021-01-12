import { Observable } from 'rxjs';

export abstract class CacheController {
  abstract set<T = any>(
    key: string,
    value: T,
    maxAge?: number
  ): Observable<void>;

  abstract get<T = any>(key: string): Observable<T | null>;

  abstract size(): Observable<number>;
}
