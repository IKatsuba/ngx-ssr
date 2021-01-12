import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheController } from './cache-controller';
import { LRU_CACHE_OPTIONS, lruCacheFactory } from './lru-cache.factory';
import { LRUCacheOptions } from './lru-cache';

@NgModule({
  imports: [CommonModule],
})
export class NgxSsrCacheModule {
  static configLruCache(
    options?: LRUCacheOptions
  ): ModuleWithProviders<NgxSsrCacheModule> {
    return {
      ngModule: NgxSsrCacheModule,
      providers: [
        {
          provide: CacheController,
          useFactory: lruCacheFactory,
        },
        options && {
          provide: LRU_CACHE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
