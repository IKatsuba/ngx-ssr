import { ErrorHandler, Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheController } from './cache-controller';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private doc: Document;

  constructor(
    private cacheController: CacheController,
    private errorHandler: ErrorHandler,
    @Inject(DOCUMENT) doc: any
  ) {
    this.doc = doc;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { method, urlWithParams } = request;

    if (method !== 'GET') {
      return next.handle(request);
    }

    return this.cacheController.get(urlWithParams).pipe(
      switchMap((cachedResponse) => {
        if (cachedResponse) {
          return of(cachedResponse);
        }

        return next.handle(request).pipe(
          switchMap((response: HttpResponse<any>) => {
            if (
              response.type === HttpEventType.Response &&
              response instanceof HttpResponse &&
              response.status >= 200 &&
              response.status < 400
            ) {
              return this.cacheController.set(urlWithParams, response).pipe(
                catchError((err) => {
                  this.errorHandler.handleError(err);

                  return of(undefined);
                }),
                mapTo(response)
              );
            }

            return of(response);
          })
        );
      })
    );
  }
}
