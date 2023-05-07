import { CacheController } from './cache-controller';
import { defer, Observable, of } from 'rxjs';

export interface LRUCacheOptions {
  maxAge: number;
  maxSize: number;
}

export class LRUCache extends CacheController {
  private readonly maxAge: number;
  private readonly maxSize: number;
  private readonly _cache: Map<string, LRUCacheEntity> = new Map();

  constructor({ maxAge, maxSize }: Partial<LRUCacheOptions> = {}) {
    super();

    this.maxAge = maxAge ?? Infinity;
    this.maxSize = maxSize ?? Infinity;
  }

  get<T = any>(key: string, notFoundValue: T = null): Observable<T | null> {
    return defer(() => {
      let value = this._cache.get(key)?.getValue();

      if (value == null) {
        this.delete(key);
        value = notFoundValue;
      }

      return Promise.resolve(value);
    });
  }

  set<T = any>(
    key: string,
    value: T,
    maxAge: number = this.maxAge
  ): Observable<void> {
    return defer(() => {
      this.deleteFirstKeyIfHaveTo();

      this._cache.set(key, new LRUCacheEntity(key, value, maxAge));

      return Promise.resolve();
    });
  }

  size(): Observable<number> {
    return of(this.sizeSync());
  }

  private delete(key: string): void {
    this._cache.delete(key);
  }

  private sizeSync(): number {
    return this._cache.size;
  }

  private deleteFirstKeyIfHaveTo(): void {
    if (this.sizeSync() >= this.maxSize) {
      const { value: firstKey } = this._cache.keys().next();

      if (firstKey) {
        this.delete(firstKey);
      }
    }
  }
}

class LRUCacheEntity<T = any> {
  private readonly _createdDate: number;

  constructor(
    public readonly key: string,
    private _value: T,
    public readonly maxAge = Infinity
  ) {
    this._createdDate = Date.now();
  }

  getValue(): T | null {
    if (this._value == null || this._createdDate + this.maxAge <= Date.now()) {
      this._value = null;
    }

    return this._value;
  }
}
