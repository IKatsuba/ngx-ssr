import { inject, InjectionToken } from '@angular/core';
import { LRUCache, LRUCacheOptions } from './lru-cache';

export const LRU_CACHE_OPTIONS = new InjectionToken<LRUCacheOptions>(
  'LRU Cache Options',
  {
    factory(): LRUCacheOptions {
      return {
        maxSize: Infinity,
        maxAge: Infinity,
      };
    },
  }
);

export function lruCacheFactory(): LRUCache {
  return new LRUCache(inject(LRU_CACHE_OPTIONS));
}
