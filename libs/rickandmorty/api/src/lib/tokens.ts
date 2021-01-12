import { inject, InjectionToken } from '@angular/core';
import { ApiOptions } from './interfaces/api-options';

export const API_OPTIONS = new InjectionToken<ApiOptions>('RaM API Options', {
  providedIn: 'root',
  factory() {
    return {
      baseUrl: 'https://rickandmortyapi.com/api/',
    };
  },
});

export const BASE_URL = new InjectionToken<string>('Base RaM API url', {
  providedIn: 'root',
  factory() {
    return inject(API_OPTIONS).baseUrl;
  },
});
