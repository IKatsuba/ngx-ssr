import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TIMEOUT_OPTIONS, TimeoutInterceptor } from './timeout.interceptor';
import { TimeoutError, timer } from 'rxjs';

@Injectable()
class ApiService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get('/api/v1/getResources');
  }

  post() {
    return this.httpClient.post('/api/v1/getResources', {
      params: {
        query: '123',
      },
    });
  }
}

describe('TimeoutInterceptor', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: TIMEOUT_OPTIONS,
          useValue: { timeout: 1_000 },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TimeoutInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('Если превышается лимит таймаута запрос обрывается', async () => {
    const response = service
      .get()
      .toPromise()
      .catch((res) => res);

    httpController.expectOne(`/api/v1/getResources`);

    await timer(2_000).toPromise();

    expect(await response).toEqual(
      new HttpErrorResponse({
        error: expect.any(TimeoutError),
        url: '/api/v1/getResources',
      })
    );
  });

  it('Если лимит НЕ превышается запрос работает в штатном режиме', async () => {
    service.get().subscribe();

    const req = httpController.expectOne(`/api/v1/getResources`);

    await timer(100).toPromise();

    req.flush(123);
  });

  afterEach(() => {
    httpController.verify();
  });
});
