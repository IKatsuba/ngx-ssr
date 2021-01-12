import { LRUCache } from './lru-cache';
import { from, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

describe('LRUCache', () => {
  let lruCache: LRUCache;

  beforeEach(() => {
    lruCache = new LRUCache();
  });

  it('should set an item', async () => {
    await lruCache.set('key', {}).toPromise();

    expect(await lruCache.size().toPromise()).toEqual(1);
  });

  it('should get an item', async () => {
    const value = { someProperty: '' };

    await lruCache.set('key', value).toPromise();

    expect(await lruCache.get('key').toPromise()).toStrictEqual(value);
  });

  describe('maxSize', () => {
    beforeEach(async () => {
      lruCache = new LRUCache({ maxSize: 3 });

      await from([1, 2, 3])
        .pipe(concatMap((value) => lruCache.set(value.toString(), value)))
        .toPromise();
    });

    it('should push out the first element', async () => {
      expect(await lruCache.get('1').toPromise()).toEqual(1);
      await lruCache.set('4', 4).toPromise();
      expect(await lruCache.get('1').toPromise()).toEqual(null);
    });
  });

  describe('maxAge', () => {
    beforeEach(async () => {
      lruCache = new LRUCache({ maxAge: 100 });

      await from([1, 2, 3])
        .pipe(concatMap((value) => lruCache.set(value.toString(), value)))
        .toPromise();
    });

    it('should return null', async () => {
      await timer(100).toPromise();

      expect(await lruCache.get('1').toPromise()).toEqual(null);
    });

    it('should override a default maxAge', async () => {
      await lruCache.set('1', 1, Infinity).toPromise();
      await timer(100).toPromise();
      expect(await lruCache.get('1').toPromise()).toEqual(1);
    });
  });
});
