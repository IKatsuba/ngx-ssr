import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_OPTIONS } from './tokens';
import { ApiOptions } from './interfaces/api-options';

@NgModule({
  imports: [CommonModule],
})
export class ApiModule {
  public static configure(options: ApiOptions): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: API_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
