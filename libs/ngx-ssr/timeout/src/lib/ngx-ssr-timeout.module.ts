import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  TIMEOUT_OPTIONS,
  TimeoutInterceptor,
  TimeoutOptions,
} from './timeout.interceptor';

@NgModule({
  imports: [CommonModule],
})
export class NgxSsrTimeoutModule {
  static forRoot(
    options?: TimeoutOptions
  ): ModuleWithProviders<NgxSsrTimeoutModule> {
    return {
      ngModule: NgxSsrTimeoutModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TimeoutInterceptor,
          multi: true,
        },
        options
          ? {
              provide: TIMEOUT_OPTIONS,
              useValue: options,
            }
          : [],
      ],
    };
  }
}
