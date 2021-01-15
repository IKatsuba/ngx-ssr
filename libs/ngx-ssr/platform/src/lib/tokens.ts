import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export const IS_SERVER_PLATFORM = new InjectionToken<boolean>('Is server?', {
  factory() {
    const platform = inject(PLATFORM_ID);

    return isPlatformServer(platform);
  },
});

export const IS_BROWSER_PLATFORM = new InjectionToken<boolean>('Is browser?', {
  factory() {
    const platform = inject(PLATFORM_ID);

    return isPlatformBrowser(platform);
  },
});
