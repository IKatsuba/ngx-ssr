import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { CacheInterceptor } from './cache.interceptor';
import { CacheController } from './cache-controller';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { LRUCache } from './lru-cache';

describe('CacheInterceptor', () => {
  let cacheController: CacheController;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: true },
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CacheInterceptor,
          multi: true,
        },
        { provide: CacheController, useClass: LRUCache },
      ],
    });

    cacheController = TestBed.inject(CacheController);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should put to cache the GET response ', fakeAsync(async () => {
    const setSpy = jest.spyOn(cacheController, 'set');

    httpClient.get('/some/url').subscribe();

    flush();

    const req = httpController.expectOne('/some/url');

    req.flush({});

    expect(setSpy).toBeCalledTimes(1);
    expect(await cacheController.get('/some/url').toPromise()).toEqual(
      new HttpResponse({ body: {}, url: '/some/url' })
    );
  }));

  it('should get a response from cache', fakeAsync(async () => {
    const body = {};
    const response = new HttpResponse({ body, url: '/some/url' });
    await cacheController.set('/some/url', response).toPromise();

    const setSpy = jest.spyOn(cacheController, 'set');
    const getSpy = jest.spyOn(cacheController, 'get');

    const responsePromise = httpClient.get('/some/url').toPromise();

    flush();

    httpController.expectNone('/some/url');

    expect(setSpy).not.toBeCalled();
    expect(getSpy).toBeCalledTimes(1);
    expect(await responsePromise).toStrictEqual(body);
  }));

  it('should skip setting the POST response to cache', fakeAsync(async () => {
    const setSpy = jest.spyOn(cacheController, 'set');

    httpClient.post('/some/url', {}).subscribe();

    flush();

    httpController.expectOne('/some/url').flush({});

    expect(setSpy).not.toBeCalled();
  }));
});
